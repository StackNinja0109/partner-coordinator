import axios from "axios";
import { useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { generateDocId } from "@/libs/firebase/firestore";
import { EventProject } from "../shared/types";
import { Timestamp } from "firebase/firestore";
import { WorkingDateAndTime } from '../shared/types'
import { db } from "@/libs/firebase/firebase";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { fromTimestampToDate } from "@/utils/convert";
import { EventProjectFormValues, EventProjectInitialFormValues, schema } from "../shared/formValues";

export const useEventCreateProvider = () => {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<EventProjectFormValues>({
    defaultValues: EventProjectInitialFormValues,
    resolver: yupResolver(schema),
  })
  const { watch, setValue, formState: { dirtyFields } } = methods

  // BACKBUTTON
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const openCancelModal = () => {
    setIsCancelModalOpen(true)
  };
  const closeCancelModal = () => {
    setIsCancelModalOpen(false)
  };    // BACKBUTTON

  // APPLIED SCHOOLS
  const [isSchoolSearchModalOpen, setIsSchoolSearchModalOpen] = useState(false)
  const [selected, setSelected] = useState("")
  const [query, setQuery] = useState("")
  const openSchoolSearchModal = () => {
    setQuery("")
    setIsSchoolSearchModalOpen(true)
  };
  const closeSchoolSearchModal = () => {
    setIsSchoolSearchModalOpen(false)
  };

  const [filteredSchools, setFilteredSchools] = useState([])
  useMemo(() => {
    const fetchOrganization = async () => {
      const organizations = await axios.post('/api/organization/search', {
        query: query,
        organizationType: '大学',
      })
      const organizationsObject = organizations.data
      setFilteredSchools(organizationsObject.map(organizationObject => {
        return {
          id: organizationObject.organizationId,
          name: organizationObject.name,
        }
      }))
    }
    setIsLoading(true)
    fetchOrganization()
    setIsLoading(false)
  }, [query])

  const [selectedSchoolNames, setSelectedSchoolNames] = useState<string[]>([])  // current selected school names
  const [schoolNames, setSchoolNames] = useState<string[]>([]); // selected schools after pressing finish button
  const handleSchoolChange = (school: string) => {
    if (selectedSchoolNames.includes(school)) {
      setSelectedSchoolNames(selectedSchoolNames.filter(name => school !== name))
    } else {
      setSelectedSchoolNames([...selectedSchoolNames, school])
    }
  }
  const handleFinishButton = () => {
    setSchoolNames(selectedSchoolNames)
    closeSchoolSearchModal();
  }   // APPLIED SCHOOLS

  // WORKPLACE
  const [prefecture, setPrefecture] = useState("")
  const [city, setCity] = useState("")
  const [address1_temp, setAddress1_temp] = useState("")

  const getWorkFromZipcode = async () => {
    await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${workZip}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          const { address1, address2, address3 } = data.results[0]

          setPrefecture(address1)
          setCity(address2)
          setAddress1_temp(address3)

          const address = `${address1}${address2}${address3}`
          setValue("workplace", address)
        } else {
          console.log("Address not found")
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
  };    // WORKPLACE

  // WORKING DATE AND TIME
  const [workingDateAndTimes, setWorkingDateAndTimes] = useState<WorkingDateAndTime[]>([])

  const initialWorkingTimeAndDate = {
    date: Timestamp.now(),
    start: {
      hour: '09',
      min: '00',
    },
    end: {
      hour: '17',
      min: '00',
    },
  }

  const handleAddWorkingDateAndTime = () => {
    setWorkingDateAndTimes([...workingDateAndTimes, initialWorkingTimeAndDate])
  }

  const handleUpdateWorkingDateAndTime = (updatedWorkingDateAndTime: WorkingDateAndTime, index: number) => {
    const prevWorkingDateAndTime = [...workingDateAndTimes]
    setWorkingDateAndTimes([...prevWorkingDateAndTime.slice(0, index), updatedWorkingDateAndTime, ...prevWorkingDateAndTime.slice(index + 1)])
  }

  const handleRemoveWorkingDateAndTime = (index: number) => {
    const prevWorkingDateAndTime = [...workingDateAndTimes]
    setWorkingDateAndTimes([...prevWorkingDateAndTime.slice(0, index), ...prevWorkingDateAndTime.slice(index + 1)])
  }

  const [isTimeForEachDay, setIsTimeForEachDay] = useState("");
  const handleIsTimeForEachDay = (value: string) => {
    isTimeForEachDay ? setIsTimeForEachDay("") : setIsTimeForEachDay(value);
  };    // WORKING DATE AND TIME

  // ADDRESS
  const getAddressFromZipcode = async () => {
    await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${addressZip}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          const { address1, address2, address3 } = data.results[0]
          setValue("addressPrefectures", { label: address1, value: address1 })
          setValue("addressCity", address2)
          setValue("addressAddress1", address3)
        } else {
          console.log("Address not found")
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
  };    // ADDRESS

  // WATCH INPUT VALUES
  const title = watch("title")
  const organizer = watch("organizer")
  const numberOfApplicants = watch("numberOfApplicants")
  const workZip = watch("workZipCode")
  const workplace = watch("workplace")
  const addressZip = watch("addressZipCode")
  const jobDescription = watch("jobDescription")
  const salary = watch("salary")

  const sei = watch("sei")
  const mei = watch("mei")
  const seiKana = watch("seiKana")
  const meiKana = watch("meiKana")
  const addressZipCode = watch("addressZipCode")
  const phoneNumber = watch("phoneNumber")
  const email = watch("email")
  const confirmEmail = watch("confirmEmail")    // WATCH INPUT VALUES

  // VALIDATE INPUT VALUES
  const isSubmitDisabled =
    title === "" ||
    organizer === "" ||
    schoolNames.length === 0 ||
    Number(numberOfApplicants) === 0 ||
    workZip === "" ||
    workplace === "" ||
    workingDateAndTimes.length === 0 ||
    jobDescription === "" ||
    salary === "" ||
    sei === "" ||
    mei === "" ||
    seiKana === "" ||
    meiKana === "" ||
    addressZipCode === "" ||
    phoneNumber === "" ||
    email === "" ||
    confirmEmail === "";    // VALIDATE INPUT VALUES

  // CREATE FIRESTORE & ELASTIC DB
  const onSubmit = async (data: EventProjectFormValues) => {
    const {
      title,
      organizer,
      numberOfApplicants,
      workZipCode,
      officeHoursNote,
      jobDescription,
      gender,
      people,
      note,
      salary,
      sei,
      mei,
      seiKana,
      meiKana,
      position,
      addressZipCode,
      addressPrefectures,
      addressCity,
      addressAddress1,
      addressAddress2,
      phoneNumber,
      email,
    } = data;

    const projectId = generateDocId();

    const project: EventProject = {
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      title: title,
      organizer: organizer,
      schoolName: schoolNames,
      numberOfApplicants: numberOfApplicants,
      workplace: {
        zip: Number(workZipCode.replaceAll('-', '')),
        prefecture: prefecture,
        city: city,
        address1: address1_temp,
      },
      officeHours: workingDateAndTimes,
      officeHoursNote: officeHoursNote,
      jobDescription: jobDescription,

      gender: gender,
      people: people,
      salary: salary,
      note: note,

      name: {
        sei: sei,
        mei: mei,
        seiKana: seiKana,
        meiKana: meiKana,
      },
      position: position,
      address: {
        zip: Number(addressZipCode.replaceAll('-', '')),
        prefecture: addressPrefectures['value'] || "",
        city: addressCity,
        address1: addressAddress1,
        address2: addressAddress2,
      },
      phoneNumber: phoneNumber.replaceAll('-', ''),
      email: email,
      status: "inpreparation",
      memo: "",
    };

    try {
      setIsLoading(true);
      try {
        await setDoc(doc(db, 'eventProjects', projectId), project, {
          merge: true,
        });
      } catch (error) {
        console.error(error)
        throw error
      }

      setIsLoading(false);
      router.push("/events/prepare");
    } catch (error) {
      throw error;
    }
  };    // CREATE FIRESTORE & ELASTIC DB

  return {
    methods,
    onSubmit,
    isLoading,
    router,
    workingDateAndTimes,
    isSchoolSearchModalOpen,
    openSchoolSearchModal,
    closeSchoolSearchModal,
    handleFinishButton,
    handleSchoolChange,
    schoolNames,
    selectedSchoolNames,
    filteredSchools,
    selected,
    setSelected,
    query,
    setQuery,
    isTimeForEachDay,
    handleIsTimeForEachDay,
    handleAddWorkingDateAndTime,
    handleUpdateWorkingDateAndTime,
    handleRemoveWorkingDateAndTime,
    getWorkFromZipcode,
    getAddressFromZipcode,
    isSubmitDisabled,
    isCancelModalOpen,
    openCancelModal,
    closeCancelModal,
  };
};
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { organizationTypes } from "@/utils/constants";
import { useParams, useRouter } from "next/navigation";
import { DocRef, getDocIdWithData } from "@/libs/firebase/firestore";
import { db } from "@/libs/firebase/firebase";
import { Timestamp, getDoc, collection, getDocs } from "firebase/firestore";
import { projectsRepository } from "../repositories/projectsRepository";
import { LeaderProject, initialLeaderProject } from "../shared/types";
import { LeaderProjectFormValues, LeaderProjectInitialFormValues, schema } from "../shared/formValues";
import { ISelectOptionsProps } from '@/components/atoms/Input/SelectBox';

export const useProjectEditProvider = () => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [clubTypeLargeCategories, setClubTypeLargeCategories] = useState([])
  const [didMount, setDidMount] = useState(false)
  const params = useParams();
  const { id } = params as { id: string }

  // CLUB TYPE LARGE CATEGORY
  useEffect(() => {
    const fetchClubLargeType = async () => {
      setIsLoading(true)
      const clubTypeLargeColRef = collection(db, 'clubTypeLargeCategories')
      const snapshot = await getDocs(clubTypeLargeColRef)
      let clubTypeLargeCategoryWithId = []
      snapshot.docs.map(doc => {
        const clubLargeObject = doc.data()
        clubTypeLargeCategoryWithId.push({
          id: doc.id,
          name: clubLargeObject.name,
        })
      })
      setClubTypeLargeCategories([...clubTypeLargeCategoryWithId])
      setIsLoading(false)
    }
    fetchClubLargeType()
  }, [])    // CLUB TYPE LARGE CATEGORY

  const [project, setProject] = useState<LeaderProject>({
    ...initialLeaderProject,
    id: id,
  }
  );
  const methods = useForm<LeaderProjectFormValues>({
    defaultValues: LeaderProjectInitialFormValues,
    resolver: yupResolver(schema),
  });
  const { watch, setValue } = methods;

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);

      const [projectDoc] = await Promise.all([
        getDoc(DocRef.leadersWantedProjects(id)),
      ]);
      const projectObject = await getDocIdWithData(projectDoc);

      console.log(projectObject.eventType, projectObject.gender)

      setValue("type", projectObject.type);
      setValue("target", projectObject.target);
      setValue("organizationName", projectObject.organizationName);
      setValue('eventType', projectObject.eventType)
      setValue("eventName", { label: projectObject.eventName, value: projectObject.eventName });
      setValue('gender', projectObject.gender)
      setValue("recruitment", projectObject.recruitment);
      setValue("zipcode", projectObject.workplace.zip.toString());
      setValue("workplace", projectObject.workplace.prefecture + projectObject.workplace.city + projectObject.workplace.address1);
      setValue("workingHours_monday", projectObject.workingHours.monday);
      setValue("workingHours_tuesday", projectObject.workingHours.tuesday);
      setValue("workingHours_wednesday", projectObject.workingHours.wednesday);
      setValue("workingHours_thursday", projectObject.workingHours.thursday);
      setValue("workingHours_friday", projectObject.workingHours.friday);
      setValue("workingHours_saturday", projectObject.workingHours.saturday);
      setValue("workingHours_sunday", projectObject.workingHours.sunday);
      setValue("workingHours_note", projectObject.workingHours.note);
      setValue("activityDescription", projectObject.activityDescription);
      setValue("desiredGender", projectObject.desiredGender);
      setValue("desiredAge", projectObject.desiredAge);
      setValue("desiredQualifications", projectObject.desiredQualifications);
      setValue("desiredTalent", projectObject.desiredTalent);
      setValue("desiredSalary", projectObject.desiredSalary);
      setValue("desiredNote", projectObject.desiredNote);
      setValue("sei", projectObject.name.sei);
      setValue("mei", projectObject.name.mei);
      setValue("seiKana", projectObject.name.seiKana);
      setValue("meiKana", projectObject.name.meiKana);
      setValue("position", projectObject.position);
      setValue("phoneNumber", projectObject.phoneNumber);
      setValue("email", projectObject.email);
      setValue("confirmEmail", projectObject.email);

      setSelectedTypeOption(projectObject.type);
      setPrefecture(projectObject.workplace.prefecture);
      setCity(projectObject.workplace.city);
      setAddress1_temp(projectObject.workplace.address1);

      setIsLoading(false);
    };

    fetchProject();
  }, []);

  // BACKBUTTON
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const openCancelModal = () => {
    setIsCancelModalOpen(true);
  };
  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
  };    // BACKBUTTON

  // TYPE & TARGET & ORGANIZATION
  const [selectedTypeOption, setSelectedTypeOption] = useState("");
  const handleTypeOptionChange = (option: string) => {
    setDidMount(true)
    setSelectedTypeOption(option);
  };

  useEffect(() => {
    if (didMount) {
      setValue("target", []);
      setValue("organizationName", '');
    }
  }, [selectedTypeOption])

  const checkboxOptions = [
    { label: "小学生", value: "小学生" },
    { label: "中学生", value: "中学生" },
    { label: "高校生", value: "高校生" },
    { label: "大学生・一般", value: "大学生・一般" },
  ];

  const [isSchoolSearchModalOpen, setIsSchoolSearchModalOpen] = useState(false);
  const openSchoolSearchModal = () => {
    setQuery('')
    setIsSchoolSearchModalOpen(true);
  };
  const closeSchoolSearchModal = () => {
    setIsSchoolSearchModalOpen(false);
  };
  let organizationTypeOptions: ISelectOptionsProps[] = [];
  organizationTypes.map((organizationType) => {
    organizationTypeOptions.push({
      label: organizationType,
      value: organizationType,
    });
  });
  organizationTypeOptions.unshift({ label: '学校区分を選択', value: '', isDisabled: true })

  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");
  const organizationType = watch("organizationType")['value'] || "";

  const [filteredSchools, setFilteredSchools] = useState([])
  useMemo(() => {
    const fetchOrganization = async () => {
      const organizations = await axios.post('/api/organization/search', {
        query: query,
        organizationType: organizationType,
      })
      const organizationsObject = organizations.data
      setFilteredSchools(organizationsObject.map(organizationObject => {
        return {
          id: organizationObject.organizationId,
          name: organizationObject.name,
        }
      }))
    }
    fetchOrganization()
  }, [query, organizationType])

  // WORKPLACE
  const [prefecture, setPrefecture] = useState("");
  const [city, setCity] = useState("");
  const [address1_temp, setAddress1_temp] = useState("");

  const getAddressFromZipcode = async () => {
    await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          const { address1, address2, address3 } = data.results[0];

          setPrefecture(address1);
          setCity(address2);
          setAddress1_temp(address3);

          const address = `${address1}${address2}${address3}`;
          setValue("workplace", address);
        } else {
          console.log("Address not found");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };    // WORKPLACE

  // WATCH INPUT VALUES
  const type = watch("type")
  const target = watch("target")
  const organizationName = watch("organizationName");
  const eventType = watch("eventType");
  const eventName = watch("eventName")['value'] || "";
  const recruitment = watch("recruitment");
  const zip = watch("zipcode");
  const workplace = watch("workplace");
  const workingHours_monday = watch("workingHours_monday");
  const workingHours_tuesday = watch("workingHours_tuesday");
  const workingHours_wednesday = watch("workingHours_wednesday");
  const workingHours_thursday = watch("workingHours_thursday");
  const workingHours_friday = watch("workingHours_friday");
  const workingHours_saturday = watch("workingHours_saturday");
  const workingHours_sunday = watch("workingHours_sunday");
  const activityDescription = watch("activityDescription");
  const desiredGender = watch("desiredGender");
  const desiredAge = watch("desiredAge");
  const desiredSalary = watch("desiredSalary");
  const sei = watch("sei");
  const mei = watch("mei");
  const seiKana = watch("seiKana");
  const meiKana = watch("meiKana");
  const phoneNumber = watch("phoneNumber");
  const email = watch("email");
  const confirmEmail = watch("confirmEmail");   // WATCH INPUT VALUES

  // CLUB TYPE CATEGORY
  const [clubTypeCategoryOptions, setClubTypeCategoryOptions] = useState([])
  useMemo(() => {
    if (didMount) setValue('eventName', { label: "選択してください", value: "" })
    const clubTypeLargeCategoryId = clubTypeLargeCategories.filter(item => item.name === eventType)[0]?.id || ""
    const fetchClubTypeCategories = async () => {
      const clubTypeCategoryRef = collection(db, 'clubTypeCategories')
      const snapshot = await getDocs(clubTypeCategoryRef)
      let clubTypeCategoryNames = []
      snapshot.docs.map(doc => {
        const clubTypeCategoryObject = doc.data()
        if (clubTypeCategoryObject.largeCategory === clubTypeLargeCategoryId) {
          clubTypeCategoryNames.push({
            value: clubTypeCategoryObject.name,
            label: clubTypeCategoryObject.name,
          })
        }
      })
      clubTypeCategoryNames.unshift({ value: '', label: '選択してください', isDisabled: true })
      setClubTypeCategoryOptions(clubTypeCategoryNames)
    }
    fetchClubTypeCategories()
  }, [eventType])   // CLUB TYPE MEDIUM CATEGORY

  // VALIDATE INPUT VALUES
  const isSubmitDisabled =
    (type !== "学 校" && target.length === 0) ||
    organizationName === "" ||
    eventType === "" ||
    eventName === "" ||
    Number(recruitment) === 0 ||
    zip === "" ||
    workplace === "" ||
    (workingHours_monday.length === 0 &&
      workingHours_tuesday.length === 0 &&
      workingHours_wednesday.length === 0 &&
      workingHours_thursday.length === 0 &&
      workingHours_friday.length === 0 &&
      workingHours_saturday.length === 0 &&
      workingHours_sunday.length === 0) ||
    activityDescription === "" ||
    desiredGender === "" ||
    desiredAge.length === 0 ||
    desiredSalary === "" ||
    sei === "" ||
    mei === "" ||
    seiKana === "" ||
    meiKana === "" ||
    phoneNumber === "" ||
    email === "" ||
    confirmEmail === "" ||
    confirmEmail === "";    // VALIDATE INPUT VALUES

  // UPDATE FIRESTORE & ELASTIC DB
  const onSubmit = async (data: LeaderProjectFormValues) => {
    const {
      type,
      target,
      organizationName,
      eventType,
      eventName,
      gender,
      recruitment,
      zipcode,
      workingHours_monday,
      workingHours_tuesday,
      workingHours_wednesday,
      workingHours_thursday,
      workingHours_friday,
      workingHours_saturday,
      workingHours_sunday,
      workingHours_note,
      activityDescription,
      desiredGender,
      desiredAge,
      desiredQualifications,
      desiredTalent,
      desiredSalary,
      desiredNote,
      sei,
      mei,
      seiKana,
      meiKana,
      position,
      phoneNumber,
      email,
    } = data;

    const updatedProject: LeaderProject = {
      createdAt: project.createdAt,
      updatedAt: Timestamp.now(),
      type: type,
      target: target,
      organizationName: organizationName,
      eventType: eventType,
      eventName: eventName['value'] || '',
      gender: gender,
      recruitment: recruitment,
      workplace: {
        zip: Number(zipcode.replaceAll('-', '')),
        prefecture: prefecture,
        city: city,
        address1: address1_temp,
      },
      workingHours: {
        monday: workingHours_monday,
        tuesday: workingHours_tuesday,
        wednesday: workingHours_wednesday,
        thursday: workingHours_thursday,
        friday: workingHours_friday,
        saturday: workingHours_saturday,
        sunday: workingHours_sunday,
        note: workingHours_note,
      },
      activityDescription: activityDescription,
      desiredGender: desiredGender,
      desiredAge: desiredAge,
      desiredQualifications: desiredQualifications,
      desiredTalent: desiredTalent,
      desiredSalary: desiredSalary,
      desiredNote: desiredNote,
      name: {
        sei: sei,
        mei: mei,
        seiKana: seiKana,
        meiKana: meiKana,
      },
      position: position,
      phoneNumber: phoneNumber.replaceAll('-', ''),
      email: email,
      status: "inpreparation",
      memo: project.memo,
    };

    setProject(updatedProject);
    try {
      setIsLoading(true);

      await projectsRepository.updateProject({
        projectId: id,
        project: updatedProject,
      })

      setIsLoading(false);
      router.push(`/projects/${id}`);
    } catch (error) {
      throw error;
    }
  };    // UPDATE FIRESTORE & ELASTIC DB

  return {
    id,
    methods,
    onSubmit,
    router,
    selectedTypeOption,
    organizationType,
    handleTypeOptionChange,
    clubTypeLargeCategories,
    clubTypeCategoryOptions,
    checkboxOptions,
    isSchoolSearchModalOpen,
    setIsSchoolSearchModalOpen,
    openSchoolSearchModal,
    closeSchoolSearchModal,
    organizationTypeOptions,
    filteredSchools,
    selected,
    setSelected,
    query,
    setQuery,
    zip,
    getAddressFromZipcode,
    isSubmitDisabled,
    isCancelModalOpen,
    openCancelModal,
    closeCancelModal,
    isLoading,
  };
};

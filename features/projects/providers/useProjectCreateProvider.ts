import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { organizationTypes } from '@/utils/constants'
import { useRouter } from 'next/navigation'
import { generateDocId } from '@/libs/firebase/firestore'
import { ISelectOptionsProps } from '@/components/atoms/Input/SelectBox'
import { collection, setDoc, doc, getDocs, serverTimestamp } from 'firebase/firestore'
import { db } from '@/libs/firebase/firebase'
import { LeaderProject } from '../shared/types'
import { LeaderProjectFormValues, LeaderProjectInitialFormValues, schema } from '../shared/formValues'

export const useProjectCreateProvider = () => {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [clubTypeLargeCategories, setClubTypeLargeCategories] = useState([])

  const methods = useForm<LeaderProjectFormValues>({
    defaultValues: LeaderProjectInitialFormValues,
    resolver: yupResolver(schema),
  })
  const { watch, setValue } = methods

  // CLUB TYPE LARGE CATEGORY
  useEffect(() => {
    const fetchClubLargeType = async () => {
      setIsLoading(true)
      const clubTypeLargeColRef = collection(db, 'clubTypeLargeCategories')
      const snapshot = await getDocs(clubTypeLargeColRef)
      let clubTypeLargeCategoryWithId = []
      snapshot.docs.map((doc) => {
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
  }, []) // CLUB TYPE LARGE CATEGORY

  // BACKBUTTON
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const openCancelModal = () => {
    setIsCancelModalOpen(true)
  }
  const closeCancelModal = () => {
    setIsCancelModalOpen(false)
  } // BACKBUTTON

  // TYPE & TARGET & ORGANIZATION
  const [selecteTypeOption, setSelectedTypeOption] = useState('学 校')
  const handleTypeOptionChange = (option: string) => {
    setSelectedTypeOption(option)
  }

  useEffect(() => {
    setValue('target', [])
    setValue('organizationName', '')
  }, [selecteTypeOption])

  const checkboxOptions = [
    { label: '小学生', value: '小学生' },
    { label: '中学生', value: '中学生' },
    { label: '高校生', value: '高校生' },
    { label: '大学生・一般', value: '大学生・一般' },
  ]

  const [isSchoolSearchModalOpen, setIsSchoolSearchModalOpen] = useState(false)
  const openSchoolSearchModal = () => {
    setQuery('')
    setIsSchoolSearchModalOpen(true)
  }
  const closeSchoolSearchModal = () => {
    setIsSchoolSearchModalOpen(false)
  }
  let organizationTypeOptions: ISelectOptionsProps[] = []
  organizationTypes.map((organizationType) => {
    organizationTypeOptions.push({
      label: organizationType,
      value: organizationType,
    })
  })
  organizationTypeOptions.unshift({
    label: '学校区分を選択',
    value: '',
    isDisabled: true,
  })

  const [selected, setSelected] = useState('')
  const [query, setQuery] = useState('')
  const organizationType = watch('organizationType')['value'] || ''

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
  const [workplaceAddress, setWorkplaceAddress] = useState({
    prefecture: '',
    city: '',
    address1_temp: '',
  })
  const [prefecture, setPrefecture] = useState('')
  const [city, setCity] = useState('')
  const [address1_temp, setAddress1_temp] = useState('')

  const getAddressFromZipcode = async () => {
    await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          const { address1, address2, address3 } = data.results[0]

          setWorkplaceAddress({
            prefecture: address1 || '',
            city: address2 || '',
            address1_temp: address3 || '',
          })

          const address = `${address1}${address2}${address3}`
          setValue('workplace', address)
        } else {
          console.log('Address not found')
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  } // WORKPLACE

  // WATCH INPUT VALUES
  const type = watch('type')
  const target = watch('target')
  const organizationName = watch('organizationName')
  const eventType = watch('eventType')
  const eventName = watch('eventName')['value'] || ''
  const recruitment = watch('recruitment')
  const zip = watch('zipcode')
  const workplace = watch('workplace')
  const workingHours_monday = watch('workingHours_monday')
  const workingHours_tuesday = watch('workingHours_tuesday')
  const workingHours_wednesday = watch('workingHours_wednesday')
  const workingHours_thursday = watch('workingHours_thursday')
  const workingHours_friday = watch('workingHours_friday')
  const workingHours_saturday = watch('workingHours_saturday')
  const workingHours_sunday = watch('workingHours_sunday')
  const activityDescription = watch('activityDescription')
  const desiredGender = watch('desiredGender')
  const desiredAge = watch('desiredAge')
  const desiredSalary = watch('desiredSalary')
  const sei = watch('sei')
  const mei = watch('mei')
  const seiKana = watch('seiKana')
  const meiKana = watch('meiKana')
  const phoneNumber = watch('phoneNumber')
  const email = watch('email')
  const confirmEmail = watch('confirmEmail') // WATCH INPUT VALUES

  // CLUB TYPE CATEGORY
  const [clubTypeCategoryOptions, setClubTypeCategoryOptions] = useState([])
  useMemo(() => {
    setValue('eventName', { label: '選択してください', value: '' })
    const clubTypeLargeCategoryId =
      clubTypeLargeCategories.filter((item) => item.name === eventType)[0]
        ?.id || ''
    const fetchClubTypeCategories = async () => {
      const clubTypeCategoryRef = collection(db, 'clubTypeCategories')
      const snapshot = await getDocs(clubTypeCategoryRef)
      let clubTypeCategoryNames = []
      snapshot.docs.map((doc) => {
        const clubTypeCategoryObject = doc.data()
        if (clubTypeCategoryObject.largeCategory === clubTypeLargeCategoryId) {
          clubTypeCategoryNames.push({
            value: clubTypeCategoryObject.name,
            label: clubTypeCategoryObject.name,
          })
        }
      })
      clubTypeCategoryNames.unshift({
        value: '',
        label: '選択してください',
        isDisabled: true,
      })
      setClubTypeCategoryOptions(clubTypeCategoryNames)
    }
    fetchClubTypeCategories()
  }, [eventType]) // CLUB TYPE MEDIUM CATEGORY

  // VALIDATE INPUT VALUES
  const isSubmitDisabled =
    (type !== '学 校' && target.length === 0) ||
    organizationName === '' ||
    eventType === '' ||
    eventName === '' ||
    Number(recruitment) < 0 ||
    zip === '' ||
    workplace === '' ||
    (workingHours_monday.length === 0 &&
      workingHours_tuesday.length === 0 &&
      workingHours_wednesday.length === 0 &&
      workingHours_thursday.length === 0 &&
      workingHours_friday.length === 0 &&
      workingHours_saturday.length === 0 &&
      workingHours_sunday.length === 0) ||
    activityDescription === '' ||
    desiredGender === '' ||
    desiredAge.length === 0 ||
    desiredSalary === '' ||
    sei === '' ||
    mei === '' ||
    seiKana === '' ||
    meiKana === '' ||
    phoneNumber === '' ||
    email === '' ||
    confirmEmail === '' ||
    confirmEmail === '' // VALIDATE INPUT VALUES

  // CREATE FIRESTORE & ELASTIC DB
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
    } = data

    const projectId = generateDocId()
    const currentTimestamp = serverTimestamp()

    const project: LeaderProject = {
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
      type: type,
      target: target,
      organizationName: organizationName,
      eventType: eventType || '',
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
      status: 'inpreparation',
      memo: '',
    }

    try {
      setIsLoading(true)
      try {
        await setDoc(doc(db, 'leadersWantedProjects', projectId), project, {
          merge: true,
        });
      } catch (error) {
        console.error(error)
        throw error
      }
      setIsLoading(false)
      router.push(`/projects/prepare`)
      // router.push(`/projects/create/${projectId}/confirm`);
    } catch (error) {
      throw error
    }
  } // CREATE FIRESTORE & ELASTIC DB

  return {
    methods,
    onSubmit,
    router,
    selecteTypeOption,
    organizationType,
    handleTypeOptionChange,
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
    getAddressFromZipcode,
    isSubmitDisabled,
    isCancelModalOpen,
    openCancelModal,
    closeCancelModal,
    isLoading,
  }
}

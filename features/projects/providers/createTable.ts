import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { organizationTypes } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { generateDocId } from "@/libs/firebase/firestore";
import { or, serverTimestamp } from "firebase/firestore";
import { createData } from "@/libs/firebase/firestore/project";

export const createTable = () => {
  interface Member {
    lastAccessedAt: number;
    unreadCount: number;
    userId: string;
  }

  interface Name {
    sei: string;
    mei: string;
    seiKana: string;
    meiKana: string;
  }

  interface Address {
    address1: string;
    address2: string;
    city: string;
    prefecture: string;
    zip: number;
  }

  interface Career {
    termOfStart: number;
    termOfEnd: number;
    organizationName: string;
  }

  interface Occupation {
    type: string;
    organization: string;
    faculty: string;
    grade: string;
  }

  interface AreaOfActivity {
    address1: string;
    address2: string;
    note: string;
    city: string;
    prefecture: string;
    zip: number;
  }

  interface OfficeHour {
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
    sunday: string[];
    note: string;
  }

  interface QuestionsForPrefecture {
    id: string;
    question: string;
    answer: string;
    prefecture: string;
  }

  interface FormValues {
    createdAt: number;
    updatedAt: number;
    name: Name;
    gender: string;
    occupation: Occupation;
    birthday: number;
    address: Address;
    phoneNumber: number;
    clubs: string[];
    areasOfActivity: AreaOfActivity[];
    officeHours: OfficeHour[];
    isExpeditionPossible: string;
    experience: boolean;
    experienceNote: string;
    teacherLicenseStatus: string;
    otherLicense: boolean;
    otherLicenseNote: string;
    hasDriverLicense: boolean;
    pr: string;
    questionsForPrefecture: QuestionsForPrefecture[];
    career: Career[];
    subscribeEmail: boolean;
    isSuspended: boolean;
    isDeletedAccount: boolean;
    deletedAt: number;
  }

  const projectId = generateDocId();

  const getRandomDate = (startDate: Date, endDate: Date): Date => {
    const timeDiff = endDate.getTime() - startDate.getTime();
    const randomTime = Math.random() * timeDiff;
    const randomDate = new Date(startDate.getTime() + randomTime);
    return randomDate;
  };

  const generateRandomString = (n: number): string => {
    let result: string = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < n; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  for (let i = 1; i < 109; i++) {
    const startDate = new Date("1970-01-01");
    const endDate = new Date("2023-07-03");
    let createdDate: Date = getRandomDate(startDate, endDate);
    let updatedDate: Date = getRandomDate(createdDate, endDate);
    let birthdayDate: Date = getRandomDate(startDate, endDate);
    const organizations: string[] = [
      "東京大学",
      "京都大学",
      "早稲田大学",
      "慶應義塾大学",
      "東北大学",
    ];
    const cities: string[] = [
      "Chiyoda",
      "Kameoka",
      "Sapporo",
      "Sakai",
      "Naha",
      "Yokohama",
      "Fukuyama",
      "Nagoya",
      "Kitakyushu",
      "Matsumoto",
    ];
    const prefectures: string[] = [
      "Tokyo",
      "Kyoto",
      "Hokkaido",
      "Osaka",
      "Okinawa",
      "Kanagawa",
      "Hiroshima",
      "Aichi",
      "Fukuoka",
      "Nagano",
    ];
    const zips: number[] = [
      3810011, 6210813, 1600007, 5900003, 9000014, 2200011, 7200011, 4530002,
      8000005, 3900008,
    ];
    let phoneNumber: number = 81;
    for (let j = 0; j < 8; j++)
      phoneNumber = phoneNumber * 10 + Math.floor(Math.random() * 10);
    let clubs: string[] = [];
    for (let j = 0; j < Math.floor(Math.random() * 5) + 1; j++) {
      clubs.push(generateRandomString(10));
    }

    let areasOfActivity: AreaOfActivity[] = [];
    for (let j = 0; j < Math.floor(Math.random() * 5) + 1; j++) {
      let x: AreaOfActivity = {
        address1: generateRandomString(10),
        address2: generateRandomString(5),
        city: cities[i % 10],
        prefecture: prefectures[i % 10],
        zip: zips[i % 10],
        note: generateRandomString(15),
      };
      areasOfActivity.push(x);
    }

    let officeHours: OfficeHour[] = [];
    for (let j = 0; j < 3; j++) {
      let x: OfficeHour = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
        note: generateRandomString(15),
      };
      officeHours.push(x);
    }

    const deletedDate: Date = getRandomDate(updatedDate, endDate);
    const project: FormValues = {
      createdAt: Math.floor(createdDate.getTime() / 1000),
      updatedAt: Math.floor(updatedDate.getTime() / 1000),
      name: {
        sei: generateRandomString(6),
        seiKana: generateRandomString(3),
        mei: generateRandomString(6),
        meiKana: generateRandomString(3),
      },
      gender: Math.floor(Math.random() * 2) ? "男性" : "女性",
      occupation: {
        faculty: "faculty " + (Math.floor(Math.random() * 10) + 1).toString(),
        grade: (Math.floor(Math.random() * 5) + 1).toString(),
        organization: organizations[Math.floor(Math.random() * 5)],
        type: ((i % 10) + 1).toString(),
      },
      birthday: birthdayDate.getTime() / 1000,
      address: {
        address1: i.toString() + " Orange Grove Rd, Orchard",
        address2: i.toString() + " Orange Grove Rd",
        city: cities[i % 10],
        prefecture: prefectures[i % 10],
        zip: zips[i % 10],
      },
      phoneNumber: phoneNumber,
      clubs: clubs,
      areasOfActivity: areasOfActivity,
      officeHours: officeHours,
      isExpeditionPossible: i % 2 ? "Possible" : "Impossible",
      experience: Math.floor(Math.random() * 2) === 0,
      experienceNote: generateRandomString(10),
      teacherLicenseStatus: generateRandomString(5),
      otherLicense: Math.floor(Math.random() * 2) === 0,
      otherLicenseNote: generateRandomString(10),
      hasDriverLicense: Math.floor(Math.random() * 2) === 0,
      pr: generateRandomString(10),
      questionsForPrefecture: [],
      career: [],
      subscribeEmail: Math.floor(Math.random() * 2) === 0,
      isSuspended: Math.floor(Math.random() * 2) === 0,
      isDeletedAccount: Math.floor(Math.random() * 2) === 0,
      deletedAt: Math.floor(deletedDate.getTime() / 1000),
    };
    (async () => {
      const { result, error } = await createData(
        "privateUsers",
        projectId,
        project
      );
    })();
  }
};

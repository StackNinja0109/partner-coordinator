"use client";

import { useState, useEffect } from "react";
import { getDocs } from "firebase/firestore";
import { ColRef, getDocIdWithData } from "@/libs/firebase/firestore";

interface eventOptionsProps {
  label: string;
  value: string;
}

export const useProjectsPrepareProvider = () => {
  const [eventOptions, setEventOptions] = useState<eventOptionsProps[]>([]);

  useEffect(() => {
    const fetchEventOptions = async () => {
      let eventList: eventOptionsProps[] = [];
      const docs = await getDocs(ColRef.leadersWantedProjects);
      docs.docs.forEach((doc) => {
        const d = getDocIdWithData(doc);
        if (!eventList.map(event => event.value).includes(d.eventName)) 
          if (d.eventName && d.eventName !== '') {
            eventList.push({label: d.eventName, value: d.eventName})
          }
      });
      setEventOptions(eventList);
    };

    fetchEventOptions();
  }, []);

  return {
    eventOptions,
  };
};

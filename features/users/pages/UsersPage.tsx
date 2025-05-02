'use client'

import Table from '@/components/organisms/Table/User/Table';
import UserSearchBar from '@/components/organisms/Table/User/UserSearchBar';
import { getClubNames } from '@/utils/clubs';
import { useEffect, useState } from 'react';
import { ISelectOptionsProps } from '@/components/atoms';

export default function UsersPage() {
  const [eventOptions, setEventOptions] = useState<ISelectOptionsProps[]>([])
  useEffect(() => {
    const fetchClubNames = async () => {
      setEventOptions(await getClubNames())
    }
    fetchClubNames()
  }, [])
  return (
    <div className="w-full px-10">
      <UserSearchBar
        caption='登録者'
        eventOptions={eventOptions}
      />
      <Table />
    </div>
  );
};
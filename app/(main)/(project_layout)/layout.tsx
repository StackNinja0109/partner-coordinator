'use client'

import { CoordinatorHeader, PCFooter } from "@/components/organisms";
import styles from '@/utils/scroll.module.css';

export default function ProjectLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${styles.scrollbar} overflow-x-hidden overflow-y-auto relative flex flex-col mt-[64px] h-[calc(100vh-64px)]`}>
      {children}
    </div>
  );
}
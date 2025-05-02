'use client'

import { Fragment, useEffect, useRef } from 'react';
import { Transition } from '@headlessui/react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const tagName = target.tagName as string
      if (
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) && tagName === "DIV"
      ) {
        onClose();
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <Transition show={isOpen} as={Fragment}>
      <div className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen p-5 bg-gray-black_clear">
        <Transition.Child
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div ref={modalRef} className="bg-gray-white mx-auto rounded-[10px] shadow-lg">
            <div className="p-8 pc:p-10 min-w-[280px] pc:min-w-[480px]">{children}</div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

export default Modal;

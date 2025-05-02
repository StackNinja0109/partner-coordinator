'use client'

import { Select, SelectProps, SelectStatus } from "@/components/atoms";
import { useRouter, usePathname, useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { MdAdd, MdArrowRight, MdOutlineTopic } from "react-icons/md";

export interface Option {
  text: string;
  href: string;
}

export interface SelectBoxProps {
  text: string;
  options: Option[];
}

interface ButtonType {
  text: string;
  onclick: () => void;
}

interface items {
  item: SelectBoxProps | SelectProps | ButtonType
}

interface SidebarOptions {
  isShowItems: boolean;
  label?: string;
  items: items[];
}

export interface SidebarProps {
  groups: SidebarOptions[];
  setActiveItem: React.Dispatch<
    React.SetStateAction<{ group: number; item: number; option: number }>
  >;
  activeItem: { group: number; item: number; option: number };
  setCurrentPage?: (href: string) => void;
}

const instanceOfSelectBoxProps = (
  item: SelectBoxProps | SelectProps | ButtonType
): item is SelectBoxProps => {
  return (item as SelectBoxProps).options !== undefined;
};

const instanceOfSelectProps = (
  item: SelectBoxProps | SelectProps | ButtonType
): item is SelectProps => {
  return (item as SelectProps).icon !== undefined;
};

const instanceOfButtonType = (
  item: SelectBoxProps | SelectProps | ButtonType
): item is ButtonType => {
  return (item as ButtonType).text !== undefined;
};

export const Sidebar = ({
  groups,
  setActiveItem,
  activeItem,
  setCurrentPage,
}: SidebarProps) => {
  const router = useRouter();
  const [showOptions, setShowOptions] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const [selectedSelect, setSelectedSelect] = useState({
    group: -1,
    item: -1,
  });

  const [selectedOption, setSelectedOption] = useState({
    group: -1,
    item: -1,
    option: -1,
  });

  const currentHref = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current) {
        let { group, item } = JSON.parse(selectRef.current?.id);

        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node) &&
          optionsRef.current &&
          !optionsRef.current.contains(event.target as Node) &&
          showOptions &&
          (group == selectedSelect.group || item == selectedSelect.item)
        ) {
          setShowOptions((prevState) => !prevState);
        }
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node) &&
          optionsRef.current &&
          !optionsRef.current.contains(event.target as Node) &&
          showOptions
        ) {
          setShowOptions(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    selectRef,
    optionsRef,
    showOptions,
    selectedSelect.group,
    selectedSelect.item,

  ]);

  const handleSelectBoxClick = (indexGroup: number, indexItem: number) => {
    if (
      selectedSelect.group !== indexGroup &&
      selectedSelect.item !== indexItem
    ) {
      setShowOptions(true);
      return;
    }
    if (
      selectedSelect.group == indexGroup &&
      selectedSelect.item == indexItem
    ) {
      setShowOptions((prevState) => !prevState);

      return;
    }
    setShowOptions((prevState) => !prevState);
  };

  useEffect(() => {
    groups.map((group, indexGroup) => {
      group.items.map((item, indexItem) => {
        if (instanceOfSelectBoxProps(item.item)) {
          item.item.options.map((option, indexOption) => {
            if (option.href == currentHref) {
              setActiveItem({
                group: indexGroup,
                item: indexItem,
                option: -1,
              });
            }
          });
        }
      });
    });
  }, [currentHref, groups, setActiveItem]);

  const currentUrl = usePathname()
  useEffect(() => {
    if (currentUrl.includes('projects')) {
      setActiveItem({
        ...activeItem,
        group: 1,
      })
    }

    if (currentUrl.includes('events')) {
      setActiveItem({
        ...activeItem,
        group: 2,
      })
    }
  }, [currentUrl])

  return (
    <aside className="w-[180px] bg-gray-white gap-1 flex flex-col drop-shadow-drop_wide">
      {groups.map((group, indexGroup) => {
        return (
          <React.Fragment key={indexGroup}>
            {group.label && (
              <div className={
                "flex items-center gap-1 pl-3 py-3 text-lg font-bold " +
                (activeItem.group == indexGroup
                  ? " bg-light-blue_light text-core-blue_dark"
                  : "  text-gray-gray")
              }>
                <MdOutlineTopic size={22} />
                {group.label}
              </div>
            )}
            {group.isShowItems && (
              <div>
                {group.items.map((item, indexItem) => {
                  return (
                    <div key={indexGroup + "-" + indexItem}>
                      {instanceOfSelectBoxProps(item.item) && (
                        <div
                          key={indexGroup + "-" + indexItem + "-select-box"}
                          className="relative flex w-max"
                        >
                          <div
                            onClick={() => {
                              setActiveItem({
                                group: indexGroup,
                                item: indexItem,
                                option: -1,
                              });
                            }}
                            className={
                              "w-[180px] flex flex-col gap-1  hover:bg-light-blue_light hover:cursor-pointer text-xs " +
                              (activeItem.group == indexGroup &&
                                activeItem.item == indexItem
                                ? " bg-light-blue_light text-core-blue_dark"
                                : "  text-gray-gray")
                            }
                          >
                            <div
                              className="flex flex-row gap-0.5 pl-4 pr-1 py-4 relative"
                              id={JSON.stringify({
                                group: indexGroup,
                                item: indexItem,
                              })}
                              ref={selectRef}
                              onClick={() => (
                                setSelectedSelect({
                                  group: indexGroup,
                                  item: indexItem,
                                }),
                                handleSelectBoxClick(indexGroup, indexItem)
                              )}
                            >
                              <div>{item.item.text}</div>
                              <MdArrowRight
                                size={24}
                                className="absolute top-0 bottom-0 my-auto right-[13.5px] text-gray-gray_dark"
                              />
                            </div>
                          </div>
                          {showOptions &&
                            selectedSelect.group == indexGroup &&
                            selectedSelect.item == indexItem && (
                              <div
                                ref={optionsRef}
                                className="w-[200px] absolute left-[100.5%] top-[50%]"
                              >
                                {item.item.options.map((option, indexOption) => (
                                  <div
                                    className={
                                      "py-1 pl-4 pr-1  text-gray-black hover:bg-gray-gray_lighter text-mini hover:cursor-pointer " +
                                      //   selectedOption.group == indexGroup &&
                                      // selectedOption.item == indexItem &&
                                      // selectedOption.option == indexOption
                                      (option.href == currentHref
                                        ? "bg-gray-gray_light"
                                        : " bg-gray-white")
                                    }
                                    key={indexGroup + indexItem + indexOption}
                                    onClick={() => {
                                      setCurrentPage && setCurrentPage(option.href);
                                      router.push(option.href);
                                      setShowOptions((prevState) => !prevState);
                                      setSelectedOption({
                                        group: indexGroup,
                                        item: indexItem,
                                        option: indexOption,
                                      });
                                    }}
                                  >
                                    {option.text}
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                      )}
                      {instanceOfSelectProps(item.item) && (
                        <div
                          key={indexGroup + "-" + indexItem + "-select"}
                          className="hover:bg-light-blue_light"
                          onClick={() => {
                            if ('href' in item.item) {
                              // item is a SelectProps or SelectBoxProps with a href property
                              setCurrentPage && setCurrentPage(item.item.href),
                                setActiveItem({
                                  group: indexGroup,
                                  item: indexItem,
                                  option: -1,
                                });
                            } else {
                              // item is a ButtonType without a href property
                              console.log('no href');
                            }
                          }}
                        >
                          <Select
                            icon={item.item.icon}
                            notice={item.item.notice}
                            status={
                              // activeItem.group == indexGroup &&
                              // activeItem.item == indexItem
                              item.item.href == currentHref
                                ? SelectStatus.ON
                                : SelectStatus.OFF
                            }
                            size={item.item.size}
                            text={item.item.text}
                            noticeNumber={item.item.notice}
                            href={item.item.href}
                          />
                        </div>
                      )}

                      {!instanceOfSelectBoxProps(item.item) &&
                        !instanceOfSelectProps(item.item) &&
                        instanceOfButtonType(item.item) && (
                          <div
                            className="py-[6px]"
                            key={indexGroup + "-" + indexItem + "-button"}
                          >
                            <button
                              className="rounded-[4px] border border-core-blue text-core-blue  flex flex-row gap-1 justify-center items-center text-mini hover:bg-light-blue_light mx-auto"
                              onClick={item.item.onclick}
                            >
                              <div className="pl-[10px]">
                                <MdAdd size={14} />
                              </div>
                              <div className="pr-[10px] py-[6px]">
                                {item.item.text}
                              </div>
                            </button>
                          </div>
                        )}
                    </div>
                  );
                })}
                {indexGroup !== groups.length - 1 && (
                  <div className="px-4">
                    <hr className="border border-gray-gray" />
                  </div>
                )}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </aside>
  );
};
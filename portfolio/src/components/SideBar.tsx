import { link } from "fs";
import React, { useState } from "react";
import { HiHome } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { AiFillProject } from "react-icons/ai";
import { MdContacts } from "react-icons/md";
import { Tab } from "@/types/tab";
import { useRouter } from "next/router";

const SideBar = () => {
  const initialTabs = [
    { id: 1, name: "HOME", status: false, icon: <HiHome />, link: "/home" },
    {
      id: 2,
      name: "ABOUT",
      status: false,
      icon: <CgProfile />,
      link: "/about",
    },
    {
      id: 3,
      name: "PROJECTS",
      status: false,
      icon: <AiFillProject />,
      link: "/projects",
    },
    {
      id: 4,
      name: "CONTACT",
      status: false,
      icon: <MdContacts />,
      link: "/contact",
    },
  ];

  let [tabs, setTabs] = useState(initialTabs);

  const router = useRouter();
  const pathname = router.pathname;

  const changeStatus = (id: number) => {
    let currentTab = tabs.filter((tab) => tab.id === id);

    currentTab[0].status = !currentTab[0].status;
    const allTabs = tabs.map((tab) => {
      return tab.id === currentTab[0].id ? currentTab[0] : tab;
    });

    setTabs(allTabs);
  };

  return (
    <main>
      <div className="absolute top-1/3  right-5 grid grid-cols-1 gap-10 ">
        {tabs.map((tab) => {
          return (
            <div
              key={tab.id}
              className="flex justify-end items-center gap-3"
            ></div>
          );
        })}
      </div>
    </main>
  );
};

export default SideBar;

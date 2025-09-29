"use client"

import Link from "next/link";
import Image from "./Image";
import { Bookmark, Community, Explore, Home, Jobs, Message, More, Premium, Profile } from "./svg";
import Notification from "./Notification";
import { useUser } from "@clerk/nextjs";
import Socket from "./Socket";

const menuList = [
  {
    id: 1,
    name: "Homepage",
    link: "/",
    icon: <Home />,
  },
  {
    id: 2,
    name: "Explore",
    link: "/",
    icon: <Explore />,
  },
  // {
  //   id: 3,
  //   name: "Notification",
  //   link: "/",
  //   icon: <Notification />,
  // },
  {
    id: 4,
    name: "Messages",
    link: "/",
    icon: <Message />,
  },
  {
    id: 5,
    name: "Bookmarks",
    link: "/",
    icon: <Bookmark />,
  },
  {
    id: 6,
    name: "Jobs",
    link: "/",
    icon: <Jobs />,
  },
  {
    id: 7,
    name: "Communities",
    link: "/",
    icon: <Community />,
  },
  {
    id: 8,
    name: "Premium",
    link: "/",
    icon: <Premium />,
  },
  {
    id: 9,
    name: "Profile",
    link: "/",
    icon: <Profile />,
  },
  {
    id: 10,
    name: "More",
    link: "/",
    icon: <More />,
  },
];

const LeftBar = () => {

  const { user } = useUser();

  return (
    <div className="h-screen sticky top-0 flex gap-4 flex-col justify-between pt-2">
      {/* LOGO MENU BUTTON */}
      <div className="flex flex-col gap-4 text-lg items-center xxl:items-start">
        {/* LOGO */}
        <Link href="/" className="p-3 flex items-center gap-5">
          <Image path="sm/icons/siteLogo.svg" alt="logo" w={24} h={24} />
          <span className="hidden xxl:inline text-iconBlue">SocialApp</span>
        </Link>
        {/* MENU LIST */}
        <div className="flex flex-col gap-4">
          {menuList.map((item, i) => (
            <div key={item.id || i} className="space-y-4" >
              {i === 2 && user && (<div><Notification /></div>)}
              <Link
                href={item.link}
                className="p-2 rounded-full hover:bg-inputGray text-white flex items-center gap-4"
              >
                <div className="size-8">{item.icon}</div>
                {/* <Image
                path={`sm/icons/${item.icon}`}
                alt={item.name}
                w={24}
                h={24}
              /> */}
                <span className="hidden xxl:inline">{item.name}</span>
              </Link>
            </div>
          ))}
        </div>
        {/* BUTTON */}
        <Link
          href="/compose/post"
          className="bg-white text-black rounded-full w-12 h-12 flex items-center justify-center xxl:hidden"
        >
          <Image path="sm/icons/post.svg" alt="new post" w={24} h={24} />
        </Link>
        <Link
          href="/compose/post"
          className="hidden xxl:block bg-white text-black rounded-full font-bold py-2 px-20"
        >
          Post
        </Link>
      </div>
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-10 relative rounded-full overflow-hidden">
            <Image src={user?.imageUrl} path={user?.imageUrl ? "" : "sm/general/avatarNew.png"} alt="avatar" w={100} h={100} tr={true} />
          </div>
          <div className="hidden xxl:flex flex-col">
            <span className="font-bold">{user?.fullName}</span>
            <span className="text-sm text-textGray">@{user?.username}</span>
          </div>
        </div>
        <div className="hidden xxl:block cursor-pointer font-bold">...</div>
      </div>
      <Socket />
    </div>
  );
};

export default LeftBar;

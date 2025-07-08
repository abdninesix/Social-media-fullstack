import Link from "next/link";
import Image from "./Image";
import { Bookmark, Community, Explore, Home, Jobs, Message, More, Notification, Premium, Profile } from "./svg";

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
  {
    id: 3,
    name: "Notification",
    link: "/",
    icon: <Notification />,
  },
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
  return (
    <div className="h-screen sticky top-0 flex flex-col justify-between pt-2 pb-8">
      {/* LOGO MENU BUTTON */}
      <div className="flex flex-col gap-4 text-lg items-center xxl:items-start">
        {/* LOGO */}
        <Link href="/" className="p-2 flex gap-2 font-bold">
          <Image path="sm/icons/siteLogo.svg" alt="logo" w={24} h={24} />
          <span className="hidden xxl:block text-xs font-extralight text-blue-400">developed by Abdullah</span>
        </Link>
        {/* MENU LIST */}
        <div className="flex flex-col gap-4">
          {menuList.map((item) => (
            <Link
              href={item.link}
              className="p-2 rounded-full hover:bg-inputGray text-white flex items-center gap-4"
              key={item.id}
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
          <div className="w-10 h-10 relative rounded-full overflow-hidden">
            <Image path="sm/general/avatarNew.png" alt="Abdullah" w={100} h={100} tr={true} />
          </div>
          <div className="hidden xxl:flex flex-col">
            <span className="font-bold">Abdullah</span>
            <span className="text-sm text-textGray">@abdninesix</span>
          </div>
        </div>
        <div className="hidden xxl:block cursor-pointer font-bold">...</div>
      </div>
    </div>
  );
};

export default LeftBar;

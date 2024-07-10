import Image from "next/image";
import { Icons } from "../ui/images/Icons";

export interface Item {
  icon?: JSX.Element | string;
  activeIcon?: JSX.Element | string;
  label: string;
  link: string;
  defLink?: string;
}

export interface Menu extends Item {
  children: Item[];
}

export const menuList: Menu[] = [
  {
    icon: <Icons.dashboard className="w-6 h-6" />,
    activeIcon: (
      <Image
        src="/uploads/icons/active-dashboard.svg"
        width={20}
        height={20}
        alt="dashboard"
      />
    ),
    label: "Dashboard",
    link: "/dashboard",
    defLink: "/",
    children: []
  },
  {
    icon: <Icons.profile className="w-6 h-6" />,
    activeIcon: (
      <Image
        src="/uploads/icons/active-dashboard.svg"
        width={20}
        height={20}
        alt="dashboard"
      />
    ),
    label: "Profile",
    link: "/profile",
    defLink: "/",
    children: []
  },
  {
    icon: <Icons.snippets className="w-6 h-6" />,
    activeIcon: (
      <Image
        src="/uploads/icons/active_latest_bets.svg"
        width={20}
        height={20}
        alt="active_latest_bets"
      />
    ),
    label: "Snippets",
    link: "",
    children: [
      {
        icon: <Icons.snippetsOutlined className="w-6 h-6" />,
        label: "Buttons",
        link: "/snippets/buttons"
      },
      {
        icon: <Icons.snippetsOutlined className="w-6 h-6" />,
        label: "Typography",
        link: "/snippets/typo"
      },
      {
        icon: <Icons.snippetsOutlined className="w-6 h-6" />,
        label: "Inputs",
        link: "/snippets/inputs"
      },
      {
        icon: <Icons.snippetsOutlined className="w-6 h-6" />,
        label: "Form",
        link: "/snippets/form"
      },
      {
        icon: <Icons.snippetsOutlined className="w-6 h-6" />,
        label: "Tables",
        link: "/snippets/table"
      }
    ]
  }
];

export interface AppBarMenuList {
  icon: JSX.Element | string;
  label: string;
  link: string | null;
}
export const appBarMenuList: AppBarMenuList[] = [
  {
    icon: <Icons.profile className="w-4 h-4" />,
    label: "Profile",
    link: "/profile"
  },
  {
    icon: <Icons.logout className="w-4 h-4" />,
    label: "Logout",
    link: null
  }
];

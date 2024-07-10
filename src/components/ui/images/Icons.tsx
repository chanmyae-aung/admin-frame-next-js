"use client";
import {
  MdEdit,
  MdLogout,
  MdOutlineClose,
  MdOutlinePhone,
  MdVerifiedUser,
  MdOutlineErrorOutline,
  MdDashboard
} from "react-icons/md";
import { AiFillSnippets, AiOutlineSnippets } from "react-icons/ai";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import { HiUsers } from "react-icons/hi2";
import { IoReloadCircle } from "react-icons/io5";

export type LoadingIconProps = {
  color: string;
  width: number;
  spinSize?: number;
  className?: string;
};

export const Icons = {
  dashboard: MdDashboard,
  profile: HiUsers,
  snippets: AiFillSnippets,
  snippetsOutlined: AiOutlineSnippets,
  users: MdVerifiedUser,
  phone: MdOutlinePhone,
  close: MdOutlineClose,
  edit: MdEdit,
  error: MdOutlineErrorOutline,
  logout: MdLogout,
  caretDown: RxCaretDown,
  caretUp: RxCaretUp,
  reload: IoReloadCircle
};

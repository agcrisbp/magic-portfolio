import { IconType } from 'react-icons';

import {
	HiChevronUp,
	HiChevronDown,
	HiChevronRight,
	HiChevronLeft,
	HiArrowUpRight,
	HiOutlineArrowPath,
	HiCheck,
	HiMiniQuestionMarkCircle,
	HiMiniXMark,
	HiOutlineLink,
	HiExclamationTriangle,
	HiInformationCircle,
	HiExclamationCircle,
	HiCheckCircle,
	HiMiniGlobeAsiaAustralia,
	HiArrowTopRightOnSquare,
	HiEnvelope,
	HiCalendarDays,
	HiClipboard,
	HiArrowRight,
	HiDocumentText,
	HiTableCells,
	HiOutlineBellAlert,
} from "react-icons/hi2";

import { HiDownload } from "react-icons/hi";

import { 
  LuHouse,
  LuMusic,
  LuBookMarked,
  LuBox,
  LuCircleUser,
} from "react-icons/lu";

import {
	PiHouseDuotone,
	PiUserCircleDuotone,
	PiGridFourDuotone,
	PiBagDuotone,
	PiDevicesDuotone,
	PiBooksDuotone,
	PiImageDuotone,
	PiSpotifyLogoDuotone
} from "react-icons/pi";

import {
	FaDiscord,
	FaGithub,
	FaLinkedin,
	FaXTwitter,
	FaYoutube,
	FaEye,
	FaEyeSlash,
} from "react-icons/fa6";

import {
  SiBluesky,
  SiSignal,
  SiStatuspage,
} from "react-icons/si";

import {
  MdMinimize,
  MdNotificationImportant,
} from "react-icons/md";

export const iconLibrary: Record<string, IconType> = {
  bluesky: SiBluesky,
  signal: SiSignal,
	chevronUp: HiChevronUp,
  chevronDown: HiChevronDown,
	chevronRight: HiChevronRight,
	chevronLeft: HiChevronLeft,
	refresh: HiOutlineArrowPath,
	arrowUpRight: HiArrowUpRight,
	check: HiCheck,
	arrowRight: HiArrowRight,
	helpCircle: HiMiniQuestionMarkCircle,
	infoCircle: HiInformationCircle,
	warningTriangle: HiExclamationTriangle,
	errorCircle: HiExclamationCircle,
	checkCircle: HiCheckCircle,
	email: HiEnvelope,
	globe: HiMiniGlobeAsiaAustralia,
	person: LuCircleUser,
	grid: PiGridFourDuotone,
	bag: PiBagDuotone,
	work: LuBox,
	book: PiBooksDuotone,
	device: PiDevicesDuotone,
	blog: LuBookMarked,
	close: HiMiniXMark,
	openLink: HiOutlineLink,
	externalLink: HiArrowTopRightOnSquare,
	calendar: HiCalendarDays,
	home: LuHouse,
	gallery: PiImageDuotone,
	discord: FaDiscord,
	github: FaGithub,
	linkedin: FaLinkedin,
	x: FaXTwitter,
	youtube: FaYoutube,
	clipboard: HiClipboard,
	music: LuMusic,
	download: HiDownload,
	resume: HiDocumentText,
	eye: FaEye,
	eyeOff: FaEyeSlash,
	status: SiStatuspage,
	minimize: MdMinimize,
	table: HiTableCells,
	important: MdNotificationImportant,
};
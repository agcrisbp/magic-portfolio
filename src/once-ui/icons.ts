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
	FaFacebook,
	FaYoutube,
	FaEye,
	FaEyeSlash,
	FaWhatsapp,
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
  
  // Hero Icons (hi)
  download: HiDownload,
  
  // Hero Icons 2 (hi2)
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
	calendar: HiCalendarDays,
	clipboard: HiClipboard,
	close: HiMiniXMark,
	openLink: HiOutlineLink,
	externalLink: HiArrowTopRightOnSquare,
	resume: HiDocumentText,
  table: HiTableCells,
  
  // Font Awesome 6
  discord: FaDiscord,
	github: FaGithub,
	linkedin: FaLinkedin,
	x: FaXTwitter,
	youtube: FaYoutube,
	facebook: FaFacebook,
	eye: FaEye,
	eyeOff: FaEyeSlash,
	whatsapp: FaWhatsapp,
  
  // Simple Icons
  bluesky: SiBluesky,
  signal: SiSignal,
  status: SiStatuspage,
  
  // Material Design Icons
  important: MdNotificationImportant,
  minimize: MdMinimize,
	
	// Phosphor Icons
	grid: PiGridFourDuotone,
	bag: PiBagDuotone,
	book: PiBooksDuotone,
	device: PiDevicesDuotone,
	gallery: PiImageDuotone,
	
	// Lucide Icons (lu)
	blog: LuBookMarked,
	work: LuBox,
	home: LuHouse,
	music: LuMusic,
	person: LuCircleUser,
};
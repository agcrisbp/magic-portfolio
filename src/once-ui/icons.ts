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
  FaSun, 
  FaCloud, 
  FaCloudRain, 
  FaCloudShowersHeavy, 
  FaBolt, 
  FaSnowflake, 
  FaSmog, 
  FaWind, 
  FaCloudMeatball, 
  FaExclamationTriangle, 
  FaUmbrellaBeach 
} from 'react-icons/fa';

import { GiSandstorm, GiVolcano } from 'react-icons/gi';

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
  MdPlayArrow, MdPause,
  MdWaves, MdOutlineGrain,
} from "react-icons/md";

import { IoRainy, IoLanguageOutline } from 'react-icons/io5';

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
  
  // Font Awesome 5
  clear: FaSun,                   // Clear weather
  clouds: FaCloud,                // Clouds
  drizzle: FaCloudShowersHeavy,   // Drizzle
  thunderstorm: FaBolt,           // Thunderstorm
  snow: FaSnowflake,              // Snow
  smoke: FaSmog,                  // Smoke
  haze: FaUmbrellaBeach,          // Haze
  fog: FaCloudMeatball,           // Fog
  squall: FaWind,                 // Squall
  tornado: FaExclamationTriangle, // Tornado
  
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
	
	// Game Icons
  sand: GiSandstorm,              // Sand
  ash: GiVolcano,                 // Ash
  
  // Ion Icons
  lang: IoLanguageOutline,
  rain: IoRainy,                  // Rain
  
  // Simple Icons
  bluesky: SiBluesky,
  signal: SiSignal,
  status: SiStatuspage,
  
  // Material Design Icons
  important: MdNotificationImportant,
  minimize: MdMinimize,
  playtopause: MdPause,
  pausetoplay: MdPlayArrow,
  dust: MdWaves,                  // Dust
  mist: MdOutlineGrain,           // Mist
	
	// Phosphor Icons
	grid: PiGridFourDuotone,
	bag: PiBagDuotone,
	book: PiBooksDuotone,
	device: PiDevicesDuotone,
	gallery: PiImageDuotone,
	spotify: PiSpotifyLogoDuotone,
	
	// Lucide Icons (lu)
	blog: LuBookMarked,
	work: LuBox,
	home: LuHouse,
	music: LuMusic,
	person: LuCircleUser,
};
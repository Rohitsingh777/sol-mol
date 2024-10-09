import { settingboxprops } from "@/components/SettingsBox";
import { PlayCircleIcon, RatIcon } from "lucide-react-native";

export const Settingslayout: settingboxprops[] = [
  {
    icon: PlayCircleIcon,
    text: "Manage Account",
    onclickpath: "/settings/ManageAccount",
    borderBottomW: 1,
    endarrow: true,
    topradius : 30 , 
  },
  {
    icon: PlayCircleIcon,
    text: "Active Networks",
    onclickpath: "/settings/Activenetwork",
    borderBottomW: 1,
    endarrow: true,
  },
  {
    icon: RatIcon,
    text: "About",
    onclickpath: "/settings/About",
    endarrow: true,
    bottomradius : 30,
  },
];

export const ManageAccountlayout: settingboxprops[] = [
  {
    icon: PlayCircleIcon,
    text: "Manage Account",
    onclickpath: "/settings/OneAccountSettings",
    // borderBottomW: 1
    endarrow: true,
    bottomradius : 30, 
    topradius : 30
  },
];

export const Accountinfolayout1: settingboxprops[] = [
  {
    icon: PlayCircleIcon,
    text: "Account Name ",
    // onclickpath: "/settings/About",
    borderBottomW: 1,
    endarrow: true,
    righttext : 'Account 1' ,
    topradius : 30 ,
  },
  {
    icon: PlayCircleIcon,
    text: "Account Addresses ",
    // onclickpath: "/settings/About",
    // borderBottomW: 1,
    endarrow: true ,
    righttext : '2',
    bottomradius : 30
  },
];

export const Accountinfolayout2: settingboxprops[] = [
  {
    icon: PlayCircleIcon,
    text: "Show Secret Phrase ",
    onclickpath: "/settings/ShowPhrase",
    borderBottomW: 1,
    endarrow: true,
    topradius : 30
    
  },
  {
    icon: PlayCircleIcon,
    text: "Show Privet Key",
    onclickpath: "/settings/Showprivkey",
    // borderBottomW: 1,
    endarrow: false,
    bottomradius : 30
  },
];



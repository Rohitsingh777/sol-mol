




import { settingboxprops } from "@/components/SettingsBox";
import { PlayCircleIcon, RatIcon ,  BadgeInfo ,Network ,Contact  
    ,Baseline ,Tally2  ,VenetianMask ,Asterisk   } from "lucide-react-native";



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
    icon: Network,
    text: "Active Networks",
    onclickpath: "/settings/Activenetwork",
    borderBottomW: 1,
    endarrow: true,
  },
  {
    icon: BadgeInfo, 
    text: "About",
    onclickpath: "/settings/About",
    endarrow: true,
    bottomradius : 30,
  },
];

export const ManageAccountlayout: settingboxprops[] = [
  {
    icon: Contact,
    text: "ACCOUNT 0",
    onclickpath: "/settings/OneAccountSettings",
    // borderBottomW: 1
    endarrow: true,
    bottomradius : 30, 
    topradius : 30
  },
];

export const Accountinfolayout1: settingboxprops[] = [
  {
    icon: Baseline,
    text: "Account Name ",
    // onclickpath: "/settings/About",
    borderBottomW: 1,
    endarrow: false,
    righttext : 'Account 1' ,
    topradius : 30 ,
  },
  {
    icon: Tally2,
    text: "Account Addresses ",
    // onclickpath: "/settings/About",
    // borderBottomW: 1,
    endarrow: false ,
    righttext : '2',
    bottomradius : 30
  },
];

export const Accountinfolayout2: settingboxprops[] = [
  {
    icon: VenetianMask,
    text: "Show Secret Phrase ",
    onclickpath: "/settings/ShowPhrase",
    borderBottomW: 1,
    endarrow: true,
    topradius : 30
    
  },
  {
    icon: Asterisk,
    text: "Show Privet Key",
    onclickpath: "/settings/Showprivkey",
    // borderBottomW: 1,
    endarrow: true ,
    bottomradius : 30
  },
];








export const Activenetworkprops: settingboxprops[] = [
    {
      icon: PlayCircleIcon,
      text: "SOLANA",
    //   onclickpath: "/settings/ManageAccount",
      borderBottomW: 5,
      endarrow: false ,
      topradius : 30 , 
    },
    {
      icon: PlayCircleIcon,
      text: "ETHERIUM",
    //   onclickpath: "/settings/Activenetwork",
    //   borderBottomW: 1,
      endarrow: false,
      bottomradius : 30 
    }
  ];
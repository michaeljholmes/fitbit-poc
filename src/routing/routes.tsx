import HomeIcon from "@mui/icons-material/Home";
import {TimelineOutlined} from "@mui/icons-material";
import SettingIcon from "@mui/icons-material/Settings";

import { Route } from "./nav";

export const routes: Route[] = [
  {
    to: "/dashboard",
    icon: <HomeIcon />,
    text: "Dashboard",
  },
  {
    to: "/dashboard/tracker",
    icon: <TimelineOutlined />,
    text: "Tracker",
  },
  // {
  //   to: "/dashboard/admin",
  //   icon: <SettingIcon />,
  //   text: "Admin",
  // },
];

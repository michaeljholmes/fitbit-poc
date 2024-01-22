import HomeIcon from "@mui/icons-material/Home";
import TimeLineIcon from "@mui/icons-material/TimeLine";
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
    icon: <TimeLineIcon />,
    text: "Tracker",
  },
  {
    to: "/dashboard/admin",
    icon: <SettingIcon />,
    text: "Admin",
  },
];

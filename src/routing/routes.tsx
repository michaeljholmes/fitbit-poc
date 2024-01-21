import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import TimeLineIcon from "@mui/icons-material/Timeline";
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
];

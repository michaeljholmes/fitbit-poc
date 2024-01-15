import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import { Route } from "./nav";

export const routes: Route[] = [
  {
    to: "/dashboard",
    icon: <HomeIcon />,
    text: "Dashboard",
  },
  {
    to: "/dashboard/test",
    icon: <EmailIcon />,
    text: "Test",
  },
];

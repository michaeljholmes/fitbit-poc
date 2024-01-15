import { Typography, Link, SxProps, Theme } from "@mui/material";

interface CopyrightProps {
  websiteName: string;
  websiteLink: string;
  sx?: SxProps<Theme>;
}

export const Copyright = ({
  websiteName,
  websiteLink,
  ...props
}: CopyrightProps) => (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {"Copyright © "}
    <Link color="inherit" href={websiteLink}>
      {websiteName}
    </Link>{" "}
    {new Date().getFullYear()}
    {"."}
  </Typography>
);

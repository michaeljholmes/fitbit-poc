import { Typography, styled, useTheme } from "@mui/material";
import { rem } from "polished";
import { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

interface ButtonLinkProps extends PropsWithChildren {
  to: string;
  text: string;
  onLinkClick?: () => void;
}

export const NavMenuLink = ({
  children,
  to,
  text,
  onLinkClick,
}: ButtonLinkProps) => {
  const theme = useTheme();
  return (
    <StyledNavLink
      to={to}
      end
      onClick={() => {
        onLinkClick && onLinkClick();
      }}
      style={({ isActive }) => {
        return {
          backgroundColor: isActive ? theme.palette.grey[700] : "",
          textDecoration: isActive ? "underline" : "",
        };
      }}
    >
      {children}
      <Typography sx={{ pl: 2, textTransform: "capitalize" }}>
        {text}
      </Typography>
    </StyledNavLink>
  );
};

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  display: "flex",
  textDecoration: "none",
  justifyContent: "flex-start",
  height: rem(50),
  width: rem(250),
  paddingLeft: theme.spacing(4),
  [theme.breakpoints.up('lg')]: {
    width: rem(180),
    paddingLeft: theme.spacing(2),
  },
  alignItems: "center",
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.grey[800],
  },
}));

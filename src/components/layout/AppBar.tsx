"use client";
import {
  AppBar as MAppBar,
  IconButton,
  Toolbar,
  useTheme,
  styled,
  Box,
  Menu,
  MenuItem,
  Badge,
  DialogTitle,
  DialogActions
} from "@mui/material";
import React, { startTransition } from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Text from "../ui/typo";
import MenuIcon from "@mui/icons-material/Menu";
import { appBarMenuList, menuList } from "./menuData";
import { usePathname, useRouter } from "next/navigation";
import { AccountCircle } from "@mui/icons-material";
import Dialog from "../ui/dialog";
import Button from "../ui/button";
import Link from "next/link";
import { Icons } from "../ui/images/Icons";
import { useSessionLogout } from "@/lib/session";

interface AppBarProps extends MuiAppBarProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

const AppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})<Omit<AppBarProps, "handleDrawerOpen">>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: theme.projectTheme.drawerWidth,
    width: `calc(100% - ${theme.projectTheme.drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const AppBar: React.FC<AppBarProps> = ({ open, handleDrawerOpen }) => {
  const router = useRouter();
  const theme = useTheme();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const { trigger: logoutTrigger } = useSessionLogout();

  const handleLogout = () => {
    logoutTrigger().then(() => {
      startTransition(() => {
        router.push("/login");
      });
    });
  };

  const getLabel = () => {
    const parentMatch = menuList?.find((each) => each.link === pathname)?.label;
    if (parentMatch) return parentMatch;

    for (const each of menuList) {
      if (each.children?.length) {
        const childMatch = each.children.find(
          (child) => child.link === pathname
        )?.label;
        if (childMatch) return childMatch;
      }
    }

    return null;
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      id={menuId}
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      keepMounted
    >
      {appBarMenuList.map((menu, key) => (
        <div key={key}>
          {menu.link ? (
            <Link href={menu.link}>
              <MenuItem sx={{ gap: 1 }}>
                {menu.icon}
                {menu.label}
              </MenuItem>
            </Link>
          ) : (
            <MenuItem sx={{ gap: 1 }} onClick={() => setDialogOpen(true)}>
              {menu.icon}
              {menu.label}
            </MenuItem>
          )}
        </div>
      ))}
    </Menu>
  );

  return (
    <>
      <AppBarStyled position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" })
            }}
          >
            <MenuIcon />
          </IconButton>
          <Text variant="h6" noWrap component="div">
            {getLabel()}
          </Text>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={() => {
                if (typeof window !== undefined) {
                  window.location.reload();
                }
              }}
              color="inherit"
            >
              <Icons.reload />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBarStyled>
      {renderMenu}
      <Dialog open={dialogOpen} setOpen={setDialogOpen}>
        <DialogTitle align="center">Are you sure?</DialogTitle>
        <DialogActions
          sx={{
            justifyContent: "center",
            gap: "10px"
          }}
        >
          <Button color="error" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleLogout}>Logout</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AppBar;

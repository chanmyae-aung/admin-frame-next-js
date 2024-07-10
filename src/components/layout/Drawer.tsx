import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { menuList } from "./menuData";
import { Collapse, Stack } from "@mui/material";
import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";
import Text from "../ui/typo";
import AppBar from "./AppBar";
import { Icons } from "../ui/images/Icons";
import Link from "next/link";

const openedMixin = (theme: Theme): CSSObject => ({
  width: theme.projectTheme.drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const DrawerStyled = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  width: theme.projectTheme.drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}));

const Drawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const theme = useTheme();
  const pathname = usePathname();
  const [open, setOpen] = React.useState<boolean>(true);
  const [openItems, setOpenItems] = React.useState<number[]>([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (index: number) => {
    const isChild = menuList.some(
      (menu) =>
        menu.children &&
        menu.children.some((child) => child.link === menuList[index].link)
    );

    if (isChild) {
      setOpenItems((prevOpenItems) => {
        const currentIndex = prevOpenItems.indexOf(index);
        if (currentIndex !== -1) {
          // If the child is already open, close it
          return [
            ...prevOpenItems.slice(0, currentIndex),
            ...prevOpenItems.slice(currentIndex + 1)
          ];
        } else {
          // If the child is not open, close other children and open this one
          const parentIndex = menuList.findIndex(
            (menu) =>
              menu.children &&
              menu.children.some((child) => child.link === menuList[index].link)
          );
          return [parentIndex, index];
        }
      });
    } else {
      setOpenItems((prevOpenItems) =>
        prevOpenItems.includes(index) ? [] : [index]
      );
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <DrawerStyled variant="permanent" open={open}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pl: 2.5
          }}
        >
          <Text className="text-xl">{theme.projectTheme.name}</Text>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
        </Box>
        <Divider />
        <List>
          {menuList.map((menu, key) => (
            <ListItem key={key} disablePadding sx={{ display: "block" }}>
              <Link href={menu.link}>
                <ListItemButton
                  selected={menu.link === pathname}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5
                  }}
                  onClick={() => handleClick(key)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? "16px" : "auto",
                      justifyContent: "center"
                    }}
                  >
                    {menu.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={menu.label}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                  {open && menu?.children?.length > 0 && (
                    <ListItemIcon
                      sx={{
                        minWidth: 0
                      }}
                    >
                      {openItems.includes(key) ? (
                        <Icons.caretUp className="w-6 h-6" />
                      ) : (
                        <Icons.caretDown className="w-6 h-6" />
                      )}
                    </ListItemIcon>
                  )}
                </ListItemButton>
              </Link>
              {open && menu?.children?.length > 0 && (
                <Collapse
                  in={openItems.includes(key)}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {menu?.children?.map((child, i) => (
                      <Link key={i} href={child.link}>
                        <ListItem disablePadding sx={{ display: "block" }}>
                          <ListItemButton
                            sx={{ ml: !open ? 8 : 5, mb: 1 }}
                            selected={child.link === pathname}
                            className={cn(
                              "flex justify-start items-center align-middle hover:bg-secondary rounded-lg"
                            )}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: 1
                              }}
                            >
                              {child.icon}
                            </ListItemIcon>
                            <ListItemText primary={child.label} />
                          </ListItemButton>
                        </ListItem>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              )}
            </ListItem>
          ))}
        </List>
      </DrawerStyled>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Box component="div">{children}</Box>
      </Box>
    </Box>
  );
};

export default Drawer;

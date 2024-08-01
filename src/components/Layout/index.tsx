import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { currentSession, isUserAuthenticated } from "../../aws";
import {
  Box,
  CssBaseline,
  AppBar,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { signOut } from "aws-amplify/auth";

const drawerWidth = 240;

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState("");

  const checkSession = useCallback(async () => {
    const signedIn = await isUserAuthenticated();
    if (!signedIn) {
      setUser("");
      navigate("/signin");
      return;
    }
    const data = await currentSession();
    if (data && data.tokens?.idToken?.payload?.email) {
      setUser(data.tokens.idToken.payload.email as string);
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  const handleLogoutClick = async () => {
    await signOut();
    navigate("/signin");
  };

  useEffect(() => {
    checkSession();
  }, [checkSession, navigate]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      ></AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton selected={location.pathname === "/"} href="/">
              <ListItemText primary={"New operation"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={location.pathname === "/records"}
              href="/records"
            >
              <ListItemText primary={"Records"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton disabled>
              <ListItemText primary={user} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogoutClick}>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;

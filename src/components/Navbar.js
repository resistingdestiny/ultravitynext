import React, { useState } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Section from "components/Section";
import { useAuth } from "util/auth";
import { useTheme } from "@mui/styles";

function Navbar(props) {
  const theme = useTheme();
  const auth = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuState, setMenuState] = useState(null);

  // Use inverted logo if specified
  // and we are in dark mode
  const logo =
    props.logoInverted && theme.name === "dark"
      ? props.logoInverted
      : props.logo;

  const handleOpenMenu = (event, id) => {
    // Store clicked element (to anchor the menu to)
    // and the menu id so we can tell which menu is open.
    setMenuState({ anchor: event.currentTarget, id });
  };

  const handleCloseMenu = () => {
    setMenuState(null);
  };

  return (
    <Section bgColor={props.color} size="auto">
      <AppBar position="static" color="transparent" elevation={0}>
        <Container disableGutters={true}>
          <Toolbar>
            <Link href="/">
              <a>
                <Box
                  component="img"
                  src={logo}
                  alt="Logo"
                  sx={{ height: "28px" }}
                />
              </a>
            </Link>
            <IconButton
              onClick={() => setDrawerOpen(true)}
              color="inherit"
              size="large"
              sx={{ ml: "auto", display: { sm: "none", xs: "block" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ ml: "auto", display: { sm: "block", xs: "none" } }}>
              {!auth.user && (
                <Link href="/auth/signin" passHref={true}>
                  <Button component="a" color="inherit">
                    Sign in
                  </Button>
                </Link>
              )}

              {auth.user && (
                <>
                  <Button
                    color="inherit"
                    aria-label="Account"
                    aria-controls="account-menu"
                    aria-haspopup="true"
                    onClick={(event) => {
                      handleOpenMenu(event, "account-menu");
                    }}
                  >
                    Account
                    <ExpandMoreIcon />
                  </Button>
                  <Menu
                    id="account-menu"
                    open={
                      menuState && menuState.id === "account-menu"
                        ? true
                        : false
                    }
                    anchorEl={menuState && menuState.anchor}
                    onClick={handleCloseMenu}
                    onClose={handleCloseMenu}
                    keepMounted={true}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <div>
                      <Link href="/dashboard" passHref={true}>
                        <MenuItem component="a">Dashboard</MenuItem>
                      </Link>
                      <Link href="/settings/general" passHref={true}>
                        <MenuItem component="a">Settings</MenuItem>
                      </Link>
                      <Divider />
                      <MenuItem
                        onClick={(event) => {
                          auth.signout();
                        }}
                      >
                        Signout
                      </MenuItem>
                    </div>
                  </Menu>
                </>
              )}

              <IconButton
                color="inherit"
                onClick={theme.toggle}
                style={{ opacity: 0.6 }}
                size="large"
              >
                {theme.name === "dark" && <NightsStayIcon />}

                {theme.name !== "dark" && <WbSunnyIcon />}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List onClick={() => setDrawerOpen(false)} sx={{ width: "250px" }}>
          {!auth.user && (
            <Link href="/auth/signin" passHref={true}>
              <ListItem component="a" button={true}>
                <ListItemText>Sign in</ListItemText>
              </ListItem>
            </Link>
          )}

          {auth.user && (
            <>
              <Link href="/dashboard" passHref={true}>
                <ListItem component="a" button={true}>
                  <ListItemText>Dashboard</ListItemText>
                </ListItem>
              </Link>
              <Link href="/settings/general" passHref={true}>
                <ListItem component="a" button={true}>
                  <ListItemText>Settings</ListItemText>
                </ListItem>
              </Link>
              <Divider />
              <ListItem
                button={true}
                onClick={(event) => {
                  auth.signout();
                }}
              >
                <ListItemText>Sign out</ListItemText>
              </ListItem>
            </>
          )}

          <ListItem>
            <IconButton
              color="inherit"
              onClick={theme.toggle}
              style={{ opacity: 0.6 }}
              size="large"
            >
              {theme.name === "dark" && <NightsStayIcon />}

              {theme.name !== "dark" && <WbSunnyIcon />}
            </IconButton>
          </ListItem>
        </List>
      </Drawer>
    </Section>
  );
}

export default Navbar;

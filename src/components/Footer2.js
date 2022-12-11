import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Section from "components/Section";
import { useTheme } from "@mui/styles";

function Footer2(props) {
  const theme = useTheme();

  // Use inverted logo if specified
  // and we are in dark mode
  const logo =
    props.logoInverted && theme.name === "dark"
      ? props.logoInverted
      : props.logo;

  const styles = {
    listItem: {
      py: "2px",
      px: "12px",
    },
    listItemHeader: {
      fontWeight: "bold",
    },
    socialIcon: {
      minWidth: "30px",
    },
  };

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
      sx={{
        ...(props.sticky && {
          // Push to bottom of page
          mt: "auto",
        }),
      }}
    >
      <Container>
        <Grid container={true} justifyContent="space-between" spacing={4}>
          <Grid item={true} xs={12} md={4}>
            <Link href="/">
              <a>
                <Box
                  component="img"
                  src={logo}
                  alt="Logo"
                  sx={{ display: "block", height: "32px" }}
                />
              </a>
            </Link>

            {props.description && (
              <Typography component="p" sx={{ mt: 3 }}>
                {props.description}
              </Typography>
            )}

            <Box
              sx={{
                mt: 3,
                fontSize: "0.875rem",
                opacity: 0.6,
                "& a": {
                  color: "inherit",
                  ml: "0.8rem",
                },
              }}
            >
              {props.copyright}
              <Link href="/legal/terms-of-service" passHref={true}>
                <MuiLink>Terms</MuiLink>
              </Link>
              <Link href="/legal/privacy-policy" passHref={true}>
                <MuiLink>Privacy</MuiLink>
              </Link>
            </Box>
          </Grid>
          <Grid item={true} xs={12} md={6}>
            <Grid container={true} spacing={4}>
              <Grid item={true} xs={12} md={4}>
                <List disablePadding={true}>
                  <ListItem sx={styles.listItem}>
                    <Typography variant="overline" sx={styles.listItemHeader}>
                      Product
                    </Typography>
                  </ListItem>

                  <Link href="/pricing" passHref={true}>
                    <ListItem component="a" button={true} sx={styles.listItem}>
                      <ListItemText>Pricing</ListItemText>
                    </ListItem>
                  </Link>
                  <Link href="/faq" passHref={true}>
                    <ListItem component="a" button={true} sx={styles.listItem}>
                      <ListItemText>FAQ</ListItemText>
                    </ListItem>
                  </Link>
                </List>
              </Grid>
              <Grid item={true} xs={12} md={4}>
                <List disablePadding={true}>
                  <ListItem sx={styles.listItem}>
                    <Typography variant="overline" sx={styles.listItemHeader}>
                      Company
                    </Typography>
                  </ListItem>
                  <Link href="/about" passHref={true}>
                    <ListItem component="a" button={true} sx={styles.listItem}>
                      <ListItemText>About</ListItemText>
                    </ListItem>
                  </Link>
                  <Link href="/contact" passHref={true}>
                    <ListItem component="a" button={true} sx={styles.listItem}>
                      <ListItemText>Contact</ListItemText>
                    </ListItem>
                  </Link>
                  <ListItem
                    button={true}
                    component="a"
                    href="https://medium.com"
                    target="_blank"
                    rel="noreferrer"
                    sx={styles.listItem}
                  >
                    <ListItemText>Blog</ListItemText>
                  </ListItem>
                </List>
              </Grid>
              <Grid item={true} xs={12} md={4}>
                <List disablePadding={true}>
                  <ListItem sx={styles.listItem}>
                    <Typography variant="overline" sx={styles.listItemHeader}>
                      Social
                    </Typography>
                  </ListItem>
                  <ListItem
                    button={true}
                    component="a"
                    href="https://twitter.com/divjoy"
                    target="_blank"
                    rel="noreferrer"
                    sx={styles.listItem}
                  >
                    <ListItemIcon sx={styles.socialIcon}>
                      <img
                        src="https://uploads.divjoy.com/icon-twitter.svg"
                        alt="Facebook"
                      />
                    </ListItemIcon>
                    <ListItemText>Twitter</ListItemText>
                  </ListItem>
                  <ListItem
                    button={true}
                    component="a"
                    href="https://facebook.com/DivjoyOfficial"
                    target="_blank"
                    rel="noreferrer"
                    sx={styles.listItem}
                  >
                    <ListItemIcon sx={styles.socialIcon}>
                      <img
                        src="https://uploads.divjoy.com/icon-facebook.svg"
                        alt="Facebook"
                      />
                    </ListItemIcon>
                    <ListItemText>Facebook</ListItemText>
                  </ListItem>
                  <ListItem
                    button={true}
                    component="a"
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    sx={styles.listItem}
                  >
                    <ListItemIcon sx={styles.socialIcon}>
                      <img
                        src="https://uploads.divjoy.com/icon-instagram.svg"
                        alt="Facebook"
                      />
                    </ListItemIcon>
                    <ListItemText>Instagram</ListItemText>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}

export default Footer2;

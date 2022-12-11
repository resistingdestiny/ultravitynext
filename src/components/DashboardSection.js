import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import MuiLink from "@mui/material/Link";
import Link from "next/link";
import { useRouter } from "next/router";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import { useAuth } from "util/auth";

function DashboardSection(props) {
  const auth = useAuth();
  const router = useRouter();

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={4}
          sx={{ textAlign: "center" }}
        />

        {router.query.paid && auth.user.planIsActive && (
          <Alert
            severity="success"
            sx={{ mx: "auto", mb: 3, maxWidth: "300px" }}
          >
            You are now subscribed
            <Box
              component="span"
              role="img"
              aria-label="party"
              sx={{ ml: "10px" }}
            >
              🥳
            </Box>
          </Alert>
        )}

        <Grid container={true} alignItems="center" spacing={6}>
          <Grid item={true} xs={12} md={6}>
            <Typography paragraph={true}>
              This would be a good place to build your custom product features
              after exporting your codebase.
            </Typography>
            <Typography paragraph={true}>
              You can grab the current user, query your database, render custom
              components, and anything else you'd like.
            </Typography>
            <Typography paragraph={true}>
              Divjoy sets you up with everything you need so that you can get
              right to work on building your web app.
            </Typography>
          </Grid>
          <Grid item={true} xs={12} md={true}>
            <figure>
              <Box
                component="img"
                src="https://uploads.divjoy.com/undraw-personal_settings_kihd.svg"
                alt="settings"
                sx={{
                  margin: "0 auto",
                  maxWidth: "470px",
                  display: "block",
                  width: "100%",
                }}
              />
            </figure>
          </Grid>
        </Grid>
        <Box sx={{ mt: 7, mx: "auto", textAlign: "center", maxWidth: "460px" }}>
          <small>
            Some helpful debug info
            <Box
              component="span"
              role="img"
              aria-label="bug"
              sx={{ ml: "10px" }}
            >
              🐛
            </Box>
          </small>

          <Paper sx={{ mt: 1 }}>
            <List component="nav" disablePadding={true}>
              <ListItem>
                <ListItemText>
                  Logged in as <strong>{auth.user.email}</strong>
                </ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText>
                  {auth.user.stripeSubscriptionId && (
                    <>
                      Subscription data
                      <br />
                      ID: <strong>{auth.user.stripeSubscriptionId}</strong>
                      <br />
                      Price ID: <strong>{auth.user.stripePriceId}</strong>
                      <br />
                      Status:{" "}
                      <strong>{auth.user.stripeSubscriptionStatus}</strong>
                    </>
                  )}

                  {!auth.user.stripeSubscriptionId && (
                    <Link href="/pricing" passHref={true}>
                      <MuiLink>Subscribe to a plan</MuiLink>
                    </Link>
                  )}
                </ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText>
                  <Link href="/settings/general" passHref={true}>
                    <MuiLink>Account settings</MuiLink>
                  </Link>
                </ListItemText>
              </ListItem>
            </List>
          </Paper>
        </Box>
      </Container>
    </Section>
  );
}

export default DashboardSection;

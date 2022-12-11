import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import Contact from "components/Contact";

function ContactSection(props) {
  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container maxWidth="lg">
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={4}
          sx={{ textAlign: "center" }}
        />
        <Grid container={true} spacing={4}>
          <Grid item={true} xs={12} md={6}>
            <Box
              component="iframe"
              src={props.embedSrc}
              title="Contact Map"
              frameBorder={0}
              sx={(theme) => ({
                border: 0,
                width: "100%",
                height: "320px",
                backgroundColor: "#efefef",
                // Use some CSS to give the embedded map a dark mode
                // since Google Maps embeds don't support it yet.
                ...(theme.name === "dark" && {
                  filter: "invert(90%)",
                }),
              })}
            />
          </Grid>
          <Grid item={true} xs={12} md={6}>
            <Contact
              showNameField={props.showNameField}
              buttonText={props.buttonText}
              buttonColor={props.buttonColor}
            />
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}

export default ContactSection;

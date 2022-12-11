import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import Newsletter from "components/Newsletter";

function NewsletterSection(props) {
  const [subscribed, setSubscribed] = useState(false);
  const image =
    subscribed && props.imageSuccess ? props.imageSuccess : props.image;

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <Grid
          container={true}
          spacing={4}
          alignItems="center"
          justifyContent="center"
        >
          <Grid
            container={true}
            item={true}
            direction="column"
            xs={12}
            sm={9}
            md={6}
          >
            <SectionHeader
              title={props.title}
              subtitle={props.subtitle}
              size={4}
              sx={{
                textAlign: {
                  xs: "center",
                  md: "left",
                },
              }}
            />
            <Newsletter
              buttonText={props.buttonText}
              buttonColor={props.buttonColor}
              inputPlaceholder={props.inputPlaceholder}
              subscribedMessage={props.subscribedMessage}
              onSubscribed={() => setSubscribed(true)}
            />
          </Grid>
          <Grid item={true} xs={12} md={true}>
            <figure>
              <Box
                component="img"
                src={image}
                alt="Illustration"
                sx={{
                  margin: "0 auto",
                  maxWidth: "400px",
                  display: "block",
                  height: "auto",
                  width: "100%",
                }}
              />
            </figure>
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}

export default NewsletterSection;

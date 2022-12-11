import React from "react";
import Container from "@mui/material/Container";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import Newsletter from "components/Newsletter";

function NewsletterSection3(props) {
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
        <Container maxWidth="sm" disableGutters={true}>
          <Newsletter
            buttonText={props.buttonText}
            buttonColor={props.buttonColor}
            inputPlaceholder={props.inputPlaceholder}
            subscribedMessage={props.subscribedMessage}
          />
        </Container>
      </Container>
    </Section>
  );
}

export default NewsletterSection3;

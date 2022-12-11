import React from "react";
import Container from "@mui/material/Container";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";

function HeroSection4(props) {
  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container sx={{ textAlign: "center" }}>
        <SectionHeader title={props.title} subtitle={props.subtitle} size={4} />
      </Container>
    </Section>
  );
}

export default HeroSection4;

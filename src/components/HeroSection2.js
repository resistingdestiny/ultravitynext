import React from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "next/link";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";

function HeroSection2(props) {
  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container sx={{ textAlign: "center" }}>
        <SectionHeader title={props.title} subtitle={props.subtitle} size={4} />
        <Link href={props.buttonPath} passHref={true}>
          <Button variant="contained" size="large" color={props.buttonColor}>
            {props.buttonText}
          </Button>
        </Link>
      </Container>
    </Section>
  );
}

export default HeroSection2;

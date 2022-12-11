import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Link from "next/link";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";

function CtaSection(props) {
  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container sx={{ textAlign: "center" }}>
        <Grid
          container={true}
          alignItems="center"
          justifyContent="center"
          spacing={5}
        >
          <Grid item={true} xs={12} md="auto">
            <SectionHeader
              title={props.title}
              subtitle={props.subtitle}
              size={4}
            />
          </Grid>
          <Grid item={true} xs={12} md="auto">
            <Link href={props.buttonPath} passHref={true}>
              <Button
                variant="contained"
                size="large"
                color={props.buttonColor}
              >
                {props.buttonText}
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}

export default CtaSection;

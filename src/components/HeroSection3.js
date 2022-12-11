import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";

function HeroSection3(props) {
  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <Grid container={true} alignItems="center" spacing={6}>
          <Grid item={true} xs={12} md={true}>
            <figure>
              <Box
                component="img"
                src={props.image}
                alt="illustration"
                sx={{
                  margin: "0 auto",
                  maxWidth: "570px",
                  display: "block",
                  height: "auto",
                  width: "100%",
                }}
              />
            </figure>
          </Grid>
          <Grid container={true} item={true} direction="column" xs={12} md={6}>
            <Box
              sx={{
                textAlign: {
                  xs: "center",
                  md: "left",
                },
              }}
            >
              <SectionHeader
                title={props.title}
                subtitle={props.subtitle}
                size={4}
              />
              <Link href={props.buttonPath} passHref={true}>
                <Button
                  variant="contained"
                  size="large"
                  color={props.buttonColor}
                >
                  {props.buttonText}
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}

export default HeroSection3;

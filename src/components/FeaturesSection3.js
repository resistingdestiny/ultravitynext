import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";

function FeaturesSection3(props) {
  const items = [
    {
      title: "Explore",
      description:
        "Integer ornare neque mauris, ac vulputate lacus venenatis et. Pellentesque ut ultrices purus.",
      image: "https://uploads.divjoy.com/undraw-mind_map_cwng.svg",
    },
    {
      title: "Explore",
      description:
        "Integer ornare neque mauris, ac vulputate lacus venenatis et. Pellentesque ut ultrices purus.",
      image: "https://uploads.divjoy.com/undraw-personal_settings_kihd.svg",
    },
    {
      title: "Explore",
      description:
        "Integer ornare neque mauris, ac vulputate lacus venenatis et. Pellentesque ut ultrices purus.",
      image: "https://uploads.divjoy.com/undraw-having_fun_iais.svg",
    },
    {
      title: "Explore",
      description:
        "Integer ornare neque mauris, ac vulputate lacus venenatis et. Pellentesque ut ultrices purus.",
      image: "https://uploads.divjoy.com/undraw-balloons_vxx5.svg",
    },
  ];

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
        <Container maxWidth="md" disableGutters={true} sx={{ mt: 7 }}>
          {items.map((item, index) => (
            <Grid
              container={true}
              item={true}
              alignItems="center"
              spacing={4}
              key={index}
              sx={{
                // Reverse every other row
                "&:nth-of-type(even)": {
                  flexDirection: "row-reverse",
                },
                // Spacing between rows
                "&:not(:last-child)": {
                  mb: 3,
                },
              }}
            >
              <Grid item={true} xs={12} md={6}>
                <Box
                  sx={{
                    textAlign: {
                      xs: "center",
                      md: "left",
                    },
                  }}
                >
                  <Typography variant="h5" gutterBottom={true}>
                    {item.title}
                  </Typography>
                  <Typography variant="subtitle1">
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
              <Grid item={true} xs={12} md={6}>
                <Box
                  component="figure"
                  sx={{
                    maxWidth: "300px",
                    margin: "30px auto",
                  }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.title}
                    sx={{
                      height: "auto",
                      maxWidth: "100%",
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          ))}
        </Container>
      </Container>
    </Section>
  );
}

export default FeaturesSection3;

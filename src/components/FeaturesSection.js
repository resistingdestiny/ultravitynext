import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ChatIcon from "@mui/icons-material/Chat";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import PetsIcon from "@mui/icons-material/Pets";
import Section from "components/Section";

function FeaturesSection(props) {
  const items = [
    {
      title: "Chat",
      description:
        "Imagine a world where you can chat with your friends without having to see their dumb faces.",
      icon: ChatIcon,
      iconColor: "primary.main",
    },
    {
      title: "Play",
      description:
        "We embedded a bunch free flash games inside our app. What we lack in quality we make up in quantity.",
      icon: VideogameAssetIcon,
      iconColor: "secondary.main",
    },
    {
      title: "Cats",
      description:
        "Our market research told us people like cats so we put some cat icons on our website.",
      icon: PetsIcon,
      iconColor: "#00d1b2",
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
        <Grid container={true} alignItems="center" spacing={8}>
          <Grid container={true} item={true} direction="column" xs={12} md={6}>
            <Box
              component="figure"
              sx={{
                margin: "0 auto",
                maxWidth: "570px",
                width: "100%",
                "& > img": {
                  width: "100%",
                },
              }}
            >
              <img src={props.image} alt="" />
            </Box>
          </Grid>
          <Grid item={true} xs={12} md={6}>
            {items.map((item, index) => (
              <Grid
                item={true}
                container={true}
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={5}
                key={index}
                sx={{
                  // Spacing between rows
                  "&:not(:last-child)": {
                    mb: 3,
                  },
                }}
              >
                <Grid item={true} xs="auto">
                  <Box
                    sx={{
                      color: item.iconColor,
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "70px",
                      width: "70px",
                      height: "70px",
                    }}
                  >
                    <item.icon fontSize="inherit" />
                  </Box>
                </Grid>
                <Grid item={true} xs={true}>
                  <Typography variant="h5" gutterBottom={true}>
                    {item.title}
                  </Typography>
                  <Typography variant="subtitle1">
                    {item.description}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}

export default FeaturesSection;

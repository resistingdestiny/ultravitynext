import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Section from "components/Section";

function FeaturesSection4(props) {
  const items = [
    {
      title: "Have fun!",
      subtitle:
        "We've gamified everything so you feel like you're having fun when you're actually doing free work for us. Win win!",
      icon: EmojiEmotionsIcon,
      iconColor: "primary.main",
    },
    {
      title: "Charge up",
      subtitle:
        "If you want to keep having fun remember to stay charged! And by that we mean you need to buy our ERC-20 CHARGE token to keep playing.",
      icon: OfflineBoltIcon,
      iconColor: "secondary.main",
    },
    {
      title: "Pick your flavor",
      subtitle:
        "Dark mode is so last year. We have a light mode and turquoise mode. Either way, your eyes are going to hurt. Don't forget to stay charged!",
      icon: Brightness4Icon,
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
        <Grid container={true} justifyContent="center" spacing={7}>
          {items.map((item, index) => (
            <Grid item={true} xs={12} md={4} key={index}>
              <Box sx={{ textAlign: "center" }}>
                <Box sx={{ color: item.iconColor, fontSize: "4.5rem" }}>
                  <item.icon fontSize="inherit" />
                </Box>
                <Typography variant="h5" gutterBottom={true}>
                  {item.title}
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 3 }}>
                  {item.subtitle}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default FeaturesSection4;

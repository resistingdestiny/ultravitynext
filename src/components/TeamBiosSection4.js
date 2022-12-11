import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";

function TeamBiosSection4(props) {
  const items = [
    {
      image: "https://uploads.divjoy.com/pexels-14661-1125x750.jpeg",
      name: "John Smith",
      role: "Software Engineer",
    },
    {
      image: "https://uploads.divjoy.com/pexels-52739-1125x750.jpeg",
      name: "Lisa Zinn",
      role: "Software Engineer",
    },
    {
      image: "https://uploads.divjoy.com/pexels-7051-1125x750.jpeg",
      name: "Sarah Howard",
      role: "Designer",
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
        <Grid container={true} justifyContent="center" spacing={4}>
          {items.map((item, index) => (
            <Grid item={true} xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardMedia
                  image={item.image}
                  title={item.name}
                  sx={{ height: "500px" }}
                />
                <Box sx={{ p: 3, textAlign: "center" }}>
                  <Typography variant="body2" component="p">
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {item.role}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default TeamBiosSection4;

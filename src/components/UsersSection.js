import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";

function UsersSection(props) {
  const items = [
    {
      headerImage: "https://source.unsplash.com/pe_R74hldW4/1080x360",
      avatarImage: "https://uploads.divjoy.com/pravatar-150x-68.jpeg",
      name: "John Smith",
      username: "johnsmith",
    },
    {
      headerImage: "https://source.unsplash.com/uwPBAlQyIag/1080x360",
      avatarImage: "https://uploads.divjoy.com/pravatar-150x-35.jpeg",
      name: "Lisa Zinn",
      username: "lisazinn",
    },
    {
      headerImage: "https://source.unsplash.com/pJ_DCj9KswI/1080x360",
      avatarImage: "https://uploads.divjoy.com/pravatar-150x-16.jpeg",
      name: "Diana Low",
      username: "dianalow",
    },
    {
      headerImage: "https://source.unsplash.com/2mjl2uvz9ic/1080x360",
      avatarImage: "https://i.pravatar.cc/150?img=7",
      name: "Shawn David",
      username: "shawndavid",
    },
    {
      headerImage: "https://source.unsplash.com/GJ8ZQV7eGmU/1080x360",
      avatarImage: "https://i.pravatar.cc/150?img=8",
      name: "Ian Gold",
      username: "iangold",
    },
    {
      headerImage: "https://source.unsplash.com/CSs8aiN_LkI/1080x360",
      avatarImage: "https://i.pravatar.cc/150?img=10",
      name: "Ali Pine",
      username: "alipine",
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
            <Grid item={true} xs={12} md={6} lg={4} key={index}>
              <Card>
                <CardMedia
                  image={item.headerImage}
                  title={item.name}
                  sx={{ height: "80px" }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: "-48px",
                  }}
                >
                  <Avatar
                    src={item.avatarImage}
                    alt={item.name}
                    sx={{
                      width: "96px",
                      height: "96px",
                    }}
                  />
                </Box>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="body2" component="p">
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    @{item.username}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default UsersSection;

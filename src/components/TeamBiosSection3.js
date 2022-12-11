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

function TeamBiosSection3(props) {
  const items = [
    {
      headerImage: "https://source.unsplash.com/pe_R74hldW4/1080x360",
      avatarImage: "https://uploads.divjoy.com/pravatar-150x-68.jpeg",
      name: "John Smith",
      role: "Software Engineer",
      bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum consequatur numquam aliquam tenetur ad amet inventore hic beatae, quas accusantium perferendis sapiente explicabo.",
    },
    {
      headerImage: "https://source.unsplash.com/uwPBAlQyIag/1080x360",
      avatarImage: "https://uploads.divjoy.com/pravatar-150x-35.jpeg",
      name: "Lisa Zinn",
      role: "Software Engineer",
      bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum consequatur numquam aliquam tenetur ad amet inventore hic beatae, quas accusantium perferendis sapiente explicabo, corporis totam! Labore reprehenderit beatae magnam animi!",
    },
    {
      headerImage: "https://source.unsplash.com/pJ_DCj9KswI/1080x360",
      avatarImage: "https://uploads.divjoy.com/pravatar-150x-16.jpeg",
      name: "Diana Low",
      role: "Designer",
      bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum consequatur numquam aliquam tenetur ad amet inventore hic beatae, quas accusantium perferendis sapiente explicabo, corporis totam! Labore reprehenderit beatae magnam animi!",
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
                  image={item.headerImage}
                  title={item.name}
                  sx={{ height: "120px" }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    // Overlap header image
                    mt: "-60px",
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: "50%",
                      padding: "7px",
                      backgroundColor: "background.paper",
                    }}
                  >
                    <Avatar
                      src={item.avatarImage}
                      alt={item.name}
                      sx={{
                        width: "120px",
                        height: "120px",
                      }}
                    />
                  </Box>
                </Box>
                <CardContent>
                  <Box sx={{ textAlign: "center" }}>
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
                    <Typography variant="body1" component="p" sx={{ mt: 2 }}>
                      {item.bio}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default TeamBiosSection3;

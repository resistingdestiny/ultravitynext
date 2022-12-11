import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";

function TeamBiosSection(props) {
  const items = [
    {
      avatar: "https://uploads.divjoy.com/pravatar-150x-68.jpeg",
      name: "John Smith",
      role: "CEO",
    },
    {
      avatar: "https://uploads.divjoy.com/pravatar-150x-35.jpeg",
      name: "Lisa Zinn",
      role: "CTO",
    },
    {
      avatar: "https://uploads.divjoy.com/pravatar-150x-16.jpeg",
      name: "Diana Low",
      role: "Designer",
    },
    {
      avatar: "https://i.pravatar.cc/150?img=5",
      name: "Niomi Clay",
      role: "Software Engineer",
    },
    {
      avatar: "https://i.pravatar.cc/150?img=6",
      name: "Tim Wesley",
      role: "Software Engineer",
    },
    {
      avatar: "https://i.pravatar.cc/150?img=7",
      name: "Shawn David",
      role: "Marketing",
    },
    {
      avatar: "https://i.pravatar.cc/150?img=8",
      name: "Ian Gold",
      role: "Marketing",
    },
    {
      avatar: "https://i.pravatar.cc/150?img=10",
      name: "Ali Pine",
      role: "Software Engineer",
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
            <Grid item={true} xs={12} sm={4} md={3} key={index}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Avatar
                  src={item.avatar}
                  alt={item.name}
                  sx={{ width: "120px", height: "120px" }}
                />
              </Box>
              <Box sx={{ textAlign: "center", pt: 3 }}>
                <Typography variant="body2" component="p">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.role}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default TeamBiosSection;

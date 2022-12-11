import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import CheckIcon from "@mui/icons-material/Check";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Link from "next/link";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import { useAuth } from "util/auth";

function PricingSection(props) {
  const auth = useAuth();

  const items = [
    {
      id: "starter",
      name: "Starter",
      price: "10",
      perks: [
        "Lorem ipsum dolor sit amet",
        "Consectetur adipiscing elit",
        "Integer molestie lorem at massa",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      price: "20",
      perks: [
        "Lorem ipsum dolor sit amet",
        "Consectetur adipiscing elit",
        "Integer molestie lorem at massa",
        "Faucibus porta lacus fringilla vel",
        "Aenean sit amet erat nunc",
      ],
    },
    {
      id: "business",
      name: "Business",
      price: "50",
      perks: [
        "Lorem ipsum dolor sit amet",
        "Consectetur adipiscing elit",
        "Integer molestie lorem at massa",
        "Faucibus porta lacus fringilla vel",
        "Aenean sit amet erat nunc",
        "Lorem ipsum dolor sit amet",
        "Consectetur adipiscing elit",
      ],
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
            <Grid item={true} xs={12} md={4} key={index}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    p: 3,
                  }}
                >
                  <Typography variant="h6" component="h2">
                    {item.name}
                  </Typography>
                  <Box sx={{ mt: 1, display: "flex", alignItems: "baseline" }}>
                    <Typography variant="h3">${item.price}</Typography>
                    <Typography variant="h4" color="textSecondary">
                      /mo
                    </Typography>
                  </Box>

                  {item.description && (
                    <Typography
                      component="p"
                      color="textSecondary"
                      sx={{ mt: 2 }}
                    >
                      {item.description}
                    </Typography>
                  )}

                  {item.perks && (
                    <List aria-label="perks" sx={{ mt: 1 }}>
                      {item.perks.map((perk, index) => (
                        <ListItem
                          disableGutters={true}
                          key={index}
                          sx={{ py: "2px" }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: "34px",
                              color: "success.main",
                            }}
                          >
                            <CheckIcon />
                          </ListItemIcon>
                          <ListItemText>{perk}</ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  )}

                  <Box sx={{ mt: "auto", pt: 3 }}>
                    <Link
                      href={
                        auth.user
                          ? `/purchase/${item.id}`
                          : `/auth/signup?next=/purchase/${item.id}`
                      }
                      passHref={true}
                    >
                      <Button
                        component="a"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth={true}
                      >
                        Choose
                      </Button>
                    </Link>
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

export default PricingSection;

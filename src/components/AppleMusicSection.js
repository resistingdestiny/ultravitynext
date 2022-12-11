import React from "react";
import Container from "@mui/material/Container";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import AppleMusicEmbed from "components/AppleMusicEmbed";

function AppleMusicSection(props) {
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
        <Container maxWidth="sm" disableGutters={true}>
          <AppleMusicEmbed url="https://music.apple.com/us/album/ultralife/1440894720?i=1222147721" />
        </Container>
      </Container>
    </Section>
  );
}

export default AppleMusicSection;

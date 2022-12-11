import React from "react";
import Container from "@mui/material/Container";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import VideoEmbed from "components/VideoEmbed";

function VideoSection(props) {
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
        <Container maxWidth="md" disableGutters={true}>
          <VideoEmbed url={props.embedUrl} />
        </Container>
      </Container>
    </Section>
  );
}

export default VideoSection;

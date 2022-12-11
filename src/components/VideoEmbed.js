import React from "react";
import Box from "@mui/material/Box";

function VideoEmbed(props) {
  return (
    <Box
      sx={{
        position: "relative",
        pb: "56.25%",
        height: 0,
        overflow: "hidden",
      }}
    >
      <Box
        component="iframe"
        src={props.url}
        allowFullScreen={true}
        frameBorder={0}
        title="Video Embed"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </Box>
  );
}

export default VideoEmbed;

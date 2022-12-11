import React from "react";
import Box from "@mui/material/Box";

function MediaEmbed(props) {
  const { width, height, ...otherProps } = props;

  return (
    <Box
      component="iframe"
      title="Media Embed"
      allow="autoplay *; encrypted-media *;"
      frameBorder={0}
      {...otherProps}
      sx={{
        width: "100%",
        overflow: "hidden",
        background: "transparent",
        height: props.height,
        maxWidth: props.width,
      }}
    />
  );
}

export default MediaEmbed;

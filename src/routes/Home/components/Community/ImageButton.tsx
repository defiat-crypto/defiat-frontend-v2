import { Box, makeStyles } from "@material-ui/core";
import React from "react";

interface ImageButtonButtonProps {
  name: string;
  href: string;
  image: string;
}

const useStyles = makeStyles((theme) => ({
  box: {
    cursor: "pointer",
    "&:hover": {
      opacity: 0.5,
    },
  },
  image: {
    height: "1.75rem",
    width: "auto",
  },
}));

export const ImageButton: React.FC<ImageButtonButtonProps> = ({
  name,
  href,
  image,
}) => {
  const classes = useStyles();

  const handleExternalLink = () => {
    const newWindow = window.open(href, "_blank", "noopener,noreferrer");
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  return (
    <Box className={classes.box} onClick={handleExternalLink} mx={1}>
      <img src={image} alt={name} className={classes.image} />
    </Box>
  );
};

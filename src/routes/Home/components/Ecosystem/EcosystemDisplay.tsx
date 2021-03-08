import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Card } from "components/Card";
import { Flex } from "components/Flex";
import { TextDecoration } from "components/TextDecoration";

interface EcosystemDisplayProps {
  image: string;
  title: string;
  text: string;
}

const useStyles = makeStyles((theme) => ({
  image: {
    [theme.breakpoints.up("md")]: {
      height: "128px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "64px",
    },
    width: "auto",
  },
  card: {
    [theme.breakpoints.up("lg")]: {
      height: "240px",
    },
    [theme.breakpoints.down("md")]: {
      height: "192px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "160px",
    },
    [theme.breakpoints.down("xs")]: {
      height: "240px",
    },
    width: "auto",
  },
}));

export const EcosystemDisplay: React.FC<EcosystemDisplayProps> = ({
  image,
  title,
  text,
}) => {
  const classes = useStyles();

  return (
    <Box>
      <Flex center mb={3}>
        <img
          src={image}
          alt={`${title}`}
          className={classes.image}
          height="64px"
        />
      </Flex>
      <Card className={classes.card}>
        <Flex column align="center">
          <Typography variant="h5" align="center" gutterBottom>
            {title}
          </Typography>
          <TextDecoration />
          <Box mt={1}>
            <Typography variant="body1" gutterBottom>
              {text}
            </Typography>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};

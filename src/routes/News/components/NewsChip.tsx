import { Box, Chip, makeStyles } from "@material-ui/core";
import React from "react";

interface NewsChipProps {
  label: string;
}

const useStyles = makeStyles((theme) => ({
  chip: {
    backgroundColor: theme.palette.primary.dark,
    // color: theme.palette.common.black
  },
}));

export const NewsChip: React.FC<NewsChipProps> = ({ label }) => {
  const classes = useStyles();

  return (
    <Box mr={1}>
      <Chip label={label} className={classes.chip} />
    </Box>
  );
};

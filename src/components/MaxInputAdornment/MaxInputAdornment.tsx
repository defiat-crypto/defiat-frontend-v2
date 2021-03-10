import { Button, InputAdornment, useTheme } from "@material-ui/core";
import React from "react";

interface MaxInputAdornmentProps {
  onClick: () => void;
}

export const MaxInputAdornment: React.FC<MaxInputAdornmentProps> = ({
  onClick,
}) => {
  const theme = useTheme();

  return (
    <InputAdornment position="end">
      <Button
        onClick={onClick}
        style={{
          padding: 0,
          backgroundColor: theme.palette.primary.light,
        }}
        variant="contained"
      >
        <b>MAX</b>
      </Button>
    </InputAdornment>
  );
};

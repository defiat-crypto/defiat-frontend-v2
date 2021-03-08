import { Box, Toolbar } from "@material-ui/core";
import { Display } from "../../components/Display";
import React from "react";
import { isLocalhost } from "../../utils";

export const Pool = () => {
  return (
    <Display offset center column>
      <Toolbar />
    </Display>
  );
};

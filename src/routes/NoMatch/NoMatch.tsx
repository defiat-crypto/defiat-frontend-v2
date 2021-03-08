import { Box, Button, Typography } from "@material-ui/core";
import React from "react";
import { Display } from "../../components/Display";
import burn256 from "../../assets/img/burn256.png";
import { useHistory } from "react-router-dom";
import { HomeRounded } from "@material-ui/icons";

export const NoMatch = () => {
  const history = useHistory();

  return (
    <Display column center>
      <Box mb={2}>
        <img src={burn256} alt="burn-404" />
      </Box>
      <Typography variant="h4" color="primary">
        404 Page Not Found
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" paragraph>
        Looks like this page is toast!
      </Typography>
      <Button onClick={() => history.push("/")} startIcon={<HomeRounded />}>
        Return Home
      </Button>
    </Display>
  );
};

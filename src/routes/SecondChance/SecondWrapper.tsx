import { Grid, Link, Typography } from "@material-ui/core";
import React from "react";
import { Display } from "../../components/Display";
import { SecondButtonGroup } from "./components/SecondButtonGroup";
import DeFiatSecondChance from "../../assets/files/DFT-DeFiat-Second-Chance.pdf";
import { Flex } from "../../components/Flex";

interface SecondWrapperProps {
  children: React.ReactNode[];
}

export const SecondWrapper: React.FC<SecondWrapperProps> = ({ children }) => {
  return (
    <Display offset center column>
      <Grid container spacing={3} direction="column" alignItems="center">
        <Grid item>
          <SecondButtonGroup />
        </Grid>
        {children &&
          children.length > 0 &&
          children.map((child: React.ReactNode, i: number) => (
            <Grid item key={i}>
              {child}
            </Grid>
          ))}
        <Grid item>
          <Flex>
            <Typography variant="body2" color="textSecondary" align="center">
              What is 2nd Chance?
            </Typography>
            <Link
              variant="body2"
              align="center"
              color="primary"
              target="_blank"
              rel="noopener,noreferrer"
              href={DeFiatSecondChance}
            >
              &nbsp;Learn More
            </Link>
          </Flex>
        </Grid>
      </Grid>
    </Display>
  );
};

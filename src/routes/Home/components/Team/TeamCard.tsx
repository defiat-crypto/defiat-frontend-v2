import { Link, Typography } from "@material-ui/core";
import React from "react";
import logo192 from "assets/img/logo192.png";
import { TextDecoration } from "components/TextDecoration";
import { Card } from "components/Card";
import { Flex } from "components/Flex";

interface TeamCardProps {
  name: string;
  title: string;
  email: string;
}

export const TeamCard: React.FC<TeamCardProps> = ({ name, title, email }) => {
  return (
    <Card>
      <Flex column center>
        <img src={logo192} alt={name} height="96" width="auto" />
        <Typography variant="h5" align="center" gutterBottom>
          {name}
        </Typography>
        <TextDecoration />
        <Typography variant="h6" color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Link href={`mailto:${email}`} variant="body1">
          {email}
        </Link>
      </Flex>
    </Card>
  );
};

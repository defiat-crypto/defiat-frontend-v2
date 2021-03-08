import { Typography } from "@material-ui/core";
import React from "react";
import { Card } from "../../../components/Card";
import { Flex } from "../../../components/Flex";
import { TextDecoration } from "../../../components/TextDecoration";

interface FAQCardProps {
  question: string;
  answer: string;
  startImage?: string;
  endImage?: string;
}

export const FAQCard: React.FC<FAQCardProps> = ({
  question,
  answer,
  startImage,
  endImage,
}) => {
  return (
    <Card>
      <Typography variant="h5">{question}</Typography>
      <TextDecoration />
      <Flex align="center">
        {startImage && (
          <img
            src={startImage}
            alt="startImage"
            height="64px"
            width="auto"
            style={{ marginRight: "8px" }}
          />
        )}
        <Typography variant="body1">{answer}</Typography>
        {endImage && (
          <img
            src={endImage}
            alt="endImage"
            height="64px"
            width="auto"
            style={{ marginLeft: "8px" }}
          />
        )}
      </Flex>
    </Card>
  );
};

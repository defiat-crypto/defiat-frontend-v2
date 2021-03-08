import React from "react";
import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from "@material-ui/lab";
import { MdCheck } from "react-icons/md";
import { Typography } from "@material-ui/core";
import { Flex } from "components/Flex";
import { Card } from "components/Card";
import { TextDecoration } from "components/TextDecoration";

interface RoadmapItemProps {
  date?: string;
  title?: string;
  text?: string;
  opposite?: boolean;
  releaseDate?: string;
}

export const RoadmapItem: React.FC<RoadmapItemProps> = ({
  opposite,
  date,
  title,
  text,
  releaseDate,
}) => {
  return (
    <TimelineItem>
      {date && (
        <TimelineOppositeContent>
          <Typography variant="h6">{date}</Typography>
          {releaseDate && (
            <Flex align="baseline" justify={!opposite ? "flex-end" : undefined}>
              {!opposite && (
                <Typography variant="body2">
                  Released on {releaseDate} &nbsp;
                </Typography>
              )}
              <MdCheck size="12px" />
              {opposite && (
                <Typography variant="body2">
                  &nbsp; Released on {releaseDate}
                </Typography>
              )}
            </Flex>
          )}
        </TimelineOppositeContent>
      )}
      <TimelineSeparator>
        <TimelineDot color="primary" variant={!!date ? "default" : "outlined"}>
          {/* <Icon /> We can put Icons here, but they must be in SVG format */}
        </TimelineDot>
        {date && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        {/* <ScrollAnimation animateIn="fadeInRight" animateOnce> */}

        {title && text && (
          <Card>
            <Flex column align={opposite ? "flex-end" : undefined}>
              <Typography variant="body1" gutterBottom>
                {title}
              </Typography>
              <TextDecoration />
              <Typography variant="body2">{text}</Typography>
            </Flex>
          </Card>
        )}
        {/* </ScrollAnimation> */}
      </TimelineContent>
    </TimelineItem>
  );
};

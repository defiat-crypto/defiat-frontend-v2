import { Box, Divider, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Flex } from "../Flex";
import { Card } from "../Card";

interface SummaryCardProps {
  id: string;
  header: string;
  title: string;
  color: string;
  tooltip: string;
  icon: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  id,
  header,
  title,
  color,
  tooltip,
  icon,
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <Card>
      {/* <Tooltip placement="left" isOpen={tooltipOpen} target={`tooltip-${id}`} toggle={toggle}>
        {tooltip}
      </Tooltip> */}
      <Flex direction="column">
        <Flex justify="space-between">
          <Flex>
            <Box mr={2}>
              <img src={icon} height="36px" width="auto" alt={header} />
            </Box>

            <Typography variant="h6" align="left">
              <b>{header}</b>
            </Typography>
          </Flex>
          <Box>
            {/* <FiInfo className={`text-${color} hover`} height="30" /> */}
            {/* <MdInfoOutline className={`text-${color} h3 mb-0`} id={`tooltip-${id}`} />
            </div> */}
          </Box>
        </Flex>

        <Flex my={1}>
          <Divider style={{ width: "100%" }} />
        </Flex>

        <Typography variant="body2" align="left">
          {title}
        </Typography>
      </Flex>
    </Card>
  );
};

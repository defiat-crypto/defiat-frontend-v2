import { IconButton } from "@material-ui/core";
import React from "react";
import { Flex, FlexProps } from "../Flex";
import {
  FaTwitter,
  FaDiscord,
  FaTelegramPlane,
  FaMediumM,
  FaGithub,
} from "react-icons/fa";
import Links from "../../constants/links";
import { SocialMediaButton } from "./components/SocialMediaButton";

export const SocialMediaButtons: React.FC<FlexProps> = ({ ...props }) => {
  return (
    <Flex {...props}>
      <SocialMediaButton
        name="twitter"
        href={Links.twitter}
        icon={<FaTwitter />}
      />
      <SocialMediaButton
        name="telegram"
        href={Links.telegram}
        icon={<FaTelegramPlane />}
      />
      <SocialMediaButton
        name="discord"
        href={Links.discord}
        icon={<FaDiscord />}
      />
      <SocialMediaButton
        name="medium"
        href={Links.medium}
        icon={<FaMediumM />}
      />
      <SocialMediaButton
        name="github"
        href={Links.github}
        icon={<FaGithub />}
      />
    </Flex>
  );
};

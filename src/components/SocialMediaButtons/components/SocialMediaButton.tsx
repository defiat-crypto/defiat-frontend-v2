import { IconButton, IconProps } from '@material-ui/core'
import React, { ReactNode } from 'react'

interface SocialMediaButtonProps {
  name: string,
  href: string,
  icon: ReactNode
}

export const SocialMediaButton: React.FC<SocialMediaButtonProps> = ({
  name,
  href,
  icon
}) => {
  return (
    <IconButton
      // target="_blank"
      //rel="noopener"
      aria-label={name}
      href={href}
      target="_blank"
    >
      {icon}
    </IconButton>
  )
}

import { Typography } from '@material-ui/core'
import React from 'react'
import { Card } from '../../../components/Card'
import { TextDecoration } from '../../../components/TextDecoration'

interface FAQCardProps {
  question: string
  answer: string
}

export const FAQCard: React.FC<FAQCardProps> = ({
  question,
  answer
}) => {
  return (
    <Card>
      <Typography variant="h5">{question}</Typography>
      <TextDecoration />
      <Typography variant="body1">{answer}</Typography>
    </Card>
  )
}

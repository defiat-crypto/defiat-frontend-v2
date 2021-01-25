import { Box, FormControl, Input, InputLabel, makeStyles, OutlinedInput, TextField } from '@material-ui/core'
import React from 'react'
import { Flex } from '../../../../components/Flex'

interface RecyclerExpandedFieldProps {
  data?:string;
  placeholder?:string;
  label?:string;
  topIcon:React.ReactNode
}

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.primary.dark,
    fontSize: '2rem',
  },
  input: {
    margin: theme.spacing(1)
  },
  text: {
    width: '25ch'
  }
}))

export const RecyclerExpandedField: React.FC<RecyclerExpandedFieldProps> = ({
  data,
  label,
  placeholder,
  topIcon
}) => {
  const classes = useStyles()

  return (
    <Box>
      <Flex center my={1}>
        {topIcon}
      </Flex>
      <TextField
        id={label}
        value={data || ''}
        // onChange={}
        type="number"
        label={label || ''}
        placeholder={placeholder || ''}
        variant="outlined"
        fullWidth
        disabled
      />
    </Box>
  )
}
      
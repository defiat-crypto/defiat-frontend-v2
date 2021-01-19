import React from 'react'
import DeFiat from '../../defiat'

export interface IDeFiatContext {
  dft?: typeof DeFiat
}

export const DeFiatContext = React.createContext({
  dft: undefined
})

import AppNavigation from './src/navigation'
import React from 'react'
import { ReduxProvider, } from './src/redux'
import { StyleProvider, } from './src/assets'

export default () => (
  <StyleProvider>
    <ReduxProvider>
      <AppNavigation a={1} />
    </ReduxProvider>
  </StyleProvider>
)

import React from 'react'

const JsonBoxContext = React.createContext({})

export const JsonBoxProvider = JsonBoxContext.Provider
export const JsonBoxConsumer = JsonBoxContext.Consumer
export default JsonBoxContext

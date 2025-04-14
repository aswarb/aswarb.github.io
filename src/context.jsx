import { useState, useContext, createContext } from 'react'

const StateContext = createContext()

export function StateContextProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false)

    return <StateContext.Provider value={{ isOpen, setIsOpen }}>{children}</StateContext.Provider>
}

export function useStateContext() {
    return useContext(StateContext)
}

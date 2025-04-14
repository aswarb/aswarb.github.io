import { useState, useContext, createContext } from 'react'

const ModalStateContext = createContext()

export function ModalStateProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <ModalStateContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </ModalStateContext.Provider>
    )
}

export function useModalContext() {
    return useContext(ModalStateContext)
}

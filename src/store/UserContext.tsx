'use client'

import { useState, createContext } from "react";

interface UserContextProps {
    children: React.ReactNode
}

export const UserContext = createContext({
    user: {
        _id: '',
        firstname: '',
        lastname: '',
        email: '',
        image_public_id: '',
    } as User,
    setUser: (key: string, value: string): void => { },
});

export const UserContextProvider = ({ children }: UserContextProps) => {
    const [user, setUser] = useState<User>({
        _id: '',
        firstname: '',
        lastname: '',
        email: '',
        image_public_id: '',
    });

    const context = {
        user: user,
        setUser: (key: string, value: string): void => {
            setUser(prevState => {
                return {
                    ...prevState,
                    [key]: value
                }
            })
        },
    };

    return (
        <UserContext.Provider value={context} >
            {children}
        </UserContext.Provider>
    )
}
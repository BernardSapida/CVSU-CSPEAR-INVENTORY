'use client'

import { useState, createContext, useEffect } from "react";

interface UserContextProps {
    children: React.ReactNode
}

export const UserContext = createContext({
    user: {
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        college: '' as College,
        role: '' as Role
    } as User | undefined,
    setUser: (user: User): void => { },
});

export const UserContextProvider = ({ children }: UserContextProps) => {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const loggedUser = localStorage.getItem('user');

        if (loggedUser) {
            setUser(JSON.parse(loggedUser));
        }
    }, []);

    const context = {
        user: user,
        setUser: (user: User): void => {
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
        },
    };

    return (
        <UserContext.Provider value={context} >
            {children}
        </UserContext.Provider>
    )
}
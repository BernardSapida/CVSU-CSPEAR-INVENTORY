'use client'

import { trpc } from '@/lib/trpc/client';
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
    const { data: loggedUser, isLoading } = trpc.users.getUserById.useQuery({ userId: '655090d119e6860ab68d0e0c' });
    const [user, setUser] = useState<User>();

    useEffect(() => {
        if (loggedUser) {
            setUser(loggedUser);
            console.log("LOGGED");
            console.log(user);
        }
    })

    const context = {
        user: user,
        setUser: (user: User): void => {
            setUser(user);
        },
    };

    return (
        <UserContext.Provider value={context} >
            {children}
        </UserContext.Provider>
    )
}
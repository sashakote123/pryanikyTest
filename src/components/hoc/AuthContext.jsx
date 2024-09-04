import React, { useState } from "react";

export const AuthContext = React.createContext(null)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem('user') || null)
    const [key, setKey] = useState(localStorage.getItem('authKey') || null)

    const signIn = (newUser, key, cb) => {
        localStorage.setItem('user', newUser)
        localStorage.setItem('authKey', key)
        setUser(newUser)
        setKey(key)
        cb()
    }
    const signOut = (cb) => {
        localStorage.removeItem('user')
        localStorage.removeItem('authKey')
        setUser(null);
        setKey(null);
        cb();
    }
    const value = { user, key, signIn, signOut }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
//в принципе, вместо создания контекста, можно было завести redux хранилище, 
//но для небольшого приложения хватит и такого :) 
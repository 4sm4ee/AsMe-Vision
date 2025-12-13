import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

    return (
        <AuthContext.Provider value={{ showAuthModal, setShowAuthModal, isSignup, setIsSignup }}>
            {children}
        </AuthContext.Provider>
    );
}
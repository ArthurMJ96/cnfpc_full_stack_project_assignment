import { createContext, useState, type ReactNode } from "react";
import type { AuthResponseDTO } from "@shared/dtos";
import { Role } from "@shared/enums";

interface AuthContextType {
    user: AuthResponseDTO | null;
    token: string | null;
    login: (userData: AuthResponseDTO, authToken: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isAuthor: boolean;
    isAdmin: boolean;
    isSupport: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => sessionStorage.getItem("tfl_token") || null);

    const [user, setUser] = useState<AuthResponseDTO | null>(() => {
        const storedUser = sessionStorage.getItem("tfl_user");
        return storedUser ? JSON.parse(storedUser) : null;
    });


    const login = (userData: AuthResponseDTO, authToken: string) => {
        setUser(userData);
        setToken(authToken);
        sessionStorage.setItem("tfl_token", authToken);
        sessionStorage.setItem("tfl_user", JSON.stringify(userData));
    };
    const logout = () => {
        setUser(null);
        setToken(null);
        sessionStorage.removeItem("tfl_token");
        sessionStorage.removeItem("tfl_user");
    }



    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            logout,
            isAuthenticated: !!user,
            isAuthor: user?.roles?.includes(Role.AUTHOR) ?? false,
            isAdmin: user?.roles?.includes(Role.ADMIN) ?? false,
            isSupport: user?.roles?.includes(Role.SUPPORT) ?? false,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

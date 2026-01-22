import { createContext, useState, type ReactNode } from "react";
import type { AuthResponseDTO } from "@shared/dtos";
import { Role } from "@shared/enums";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "@/lib/api";

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
    const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_STORAGE_KEY) || null);

    const [user, setUser] = useState<AuthResponseDTO | null>(() => {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        return storedUser ? JSON.parse(storedUser) : null;
    });


    const login = (userData: AuthResponseDTO, authToken: string) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem(TOKEN_STORAGE_KEY, authToken);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    };
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.removeItem(USER_STORAGE_KEY);
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

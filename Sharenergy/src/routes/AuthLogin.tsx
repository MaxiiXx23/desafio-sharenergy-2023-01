import { ReactNode } from "react";

import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";


interface IProps {
    children: ReactNode;
}

export function AuthLogin({ children }: IProps) {

    const { signed } = useAuth();
    
    return (
        <>
            {
                signed ? <Navigate to="/listUsers" /> : children
            }
        </>
    )
}
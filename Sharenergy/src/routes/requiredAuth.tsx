import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth';


interface IProps {
    children: ReactNode;
}

export function RequireAuth({ children }: IProps) {

    const { signed, loadingData } = useAuth();

    useEffect(() => {
        loadingData();
    },[])
    
    return (
        <>
            {
                signed ? children
                    : <Navigate to='/' />
            }
        </>
    )
}
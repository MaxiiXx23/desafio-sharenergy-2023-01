import {
    createContext,
    useState,
    useContext,
    ReactNode,
} from "react";

import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { AxiosResponse, AxiosError } from "axios";
import dayjs from "dayjs";

import { api } from "../services/api";



interface IResponse {
    user: {
        username: string;
    }
    token: string;
    refreshToken: string;
}

interface IResponseRefreshToken {
    token: string;
    refreshToken: string;
}

interface User {
    username: string;
    token: string;
    refreshToken: string;
}

interface SignInCredentials {
    username: string;
    password: string;
    isChecked: boolean;
}

interface AuthContextData {
    user: User;
    signed: boolean;
    signIn: (credentials: SignInCredentials) => Promise<void>;
    signOut: () => Promise<void>;
    loadingData: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const localStorageAccountKey = "@challenge:account";
const usersLocalStorageKey = "@challenge:users";

const cookie = new Cookies();
const cookieRefreshToken = "@challenge:token"

function AuthProvider({ children }: AuthProviderProps) {
    const [data, setData] = useState<User>({} as User);
    const [signed, setSigned] = useState(false);

    async function signIn({ username, password, isChecked }: SignInCredentials) {
        try {

            const response: AxiosResponse<IResponse> = await api.post('/account/authenticate', {
                username,
                password
            });

            const { token, user, refreshToken } = response.data;

            setData({ username: user.username, token, refreshToken });

            api.defaults.headers.authorization = `Bearer ${token}`;

            const dataCurrent = dayjs().add(1, 'day').toDate();

            if (!isChecked) {
                cookie.set(cookieRefreshToken, token, {
                    expires: dataCurrent
                });
                setSigned(true);
            } else {
                localStorage.setItem(localStorageAccountKey, refreshToken)
                setSigned(true);
            }


        } catch (error) {
           
            toast.error('Username ou senha incorreta.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        }

    }

    async function signOut() {

        try {
            api.defaults.headers.authorization = ``;
            setData({} as User);
            localStorage.removeItem(localStorageAccountKey);
            sessionStorage.removeItem(usersLocalStorageKey);
            cookie.remove(cookieRefreshToken);
            setSigned(false);
        } catch (error) {
            console.log(error);
        }

    }

    async function loadingData() {

        const dataLocalStorage = localStorage.getItem(localStorageAccountKey);
        const dataCookie = cookie.get(cookieRefreshToken);

        if (dataLocalStorage) {

            try {
                const refreshToken = dataLocalStorage;
                const response: AxiosResponse<IResponseRefreshToken> =
                    await api.post("/account/refreshToken/", {
                        refreshToken
                    });

                const { refreshToken: newRefreshToken, token } = response.data;

                localStorage.removeItem(localStorageAccountKey);
                localStorage.setItem(localStorageAccountKey, newRefreshToken);

                api.defaults.headers.authorization = `Bearer ${token}`;

                setSigned(true);
            } catch (error) {
                const { status } = error as AxiosError;
                if(status === 498){

                    toast.info('Por favor faça login novamente.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    await signOut();
                }
            }

        } else if (dataCookie) {
            api.defaults.headers.authorization = `Bearer ${dataCookie}`;
            setSigned(true);
        } else {
            setSigned(false);
        }

    }

    return (
        <AuthContext.Provider
            value={{
                user: data,
                signIn,
                signOut,
                signed,
                loadingData,
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth }
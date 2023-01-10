import { FormEvent, useState } from "react";

import { User } from "phosphor-react";
import { useLottie } from 'lottie-react';

import styles from "./styles.module.css";

import Logo from "../../assets/logo.svg";
import peopleAnimated from "../../assets/connection-people.json";

import { Input } from "../../components/Input";
import { InputPassword } from "../../components/InputPassword";
import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";


function LoginPage() {

    const { signIn } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const options = {
        animationData: peopleAnimated,
        loop: true,
        style: {
            width: '100%',
            height: '100%'
        }
    };

    const { View: ViewAnimated } = useLottie(options);

    async function handleSubmitLogin(event: FormEvent) {

        event.preventDefault();

        const target = event.target as typeof event.target & {
            username: { value: string };
            password: { value: string };
        };

        const { username, password } = target;

        
        await signIn({
            username: username.value,
            password: password.value,
            isChecked
        })
        navigate("/listUsers")
    }

    return (
        <div className={styles.containerMain}>
            <div className={styles.containerLogin}>

                <div className={styles.wrapperAnimation}>
                    {ViewAnimated}
                </div>

                <div className={styles.containerForm}>
                    <header className={styles.containerHeader}>
                        <img src={Logo} alt="Logo Sharenergy" />
                        <strong className={styles.title}>Login</strong>
                    </header>
                    <form onSubmit={handleSubmitLogin} className={styles.form}>
                        <label>
                            <span>Nome de usuário:</span>
                            <Input
                                IconName={<User color="black" />}
                                name="username"
                                placeholder="Digite seu nome"
                                type="text"
                                onChange={e => setUsername(e.target.value)}
                                value={username}
                            />
                        </label>
                        <label>
                            <span>Senha:</span>
                            <InputPassword
                                name="password"
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                            />
                        </label>
                        <div className={styles.wrapperCheckBox}>
                            <input 
                                type="checkbox" 
                                name="remember"
                                onChange={() => setIsChecked((prevent) => !prevent)} 
                                checked={isChecked}
                            />
                            <strong>Lembre-me</strong>
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export { LoginPage };
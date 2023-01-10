import { InputHTMLAttributes, useState } from "react";

import { Eye, EyeClosed } from "phosphor-react";

import styles from "./styles.module.css";

interface IProps extends InputHTMLAttributes<HTMLInputElement>{

}


function InputPassword({ ...rest }: IProps) {

    const [visibility, setVisibility] = useState(false);

    function handleVisibilityPassword() {
        setVisibility((prevent) => !prevent)
    }

    return (
        <div className={styles.containerInput}>
            <input
                type={visibility ? "text" : "password"}
                name="password"
                placeholder="Digite sua senha"
                {...rest}
            />
            <div onClick={handleVisibilityPassword}>
                {
                    visibility ?
                        <Eye
                            size={18}
                            color="black"
                        />
                        : <EyeClosed
                            size={18}
                            color="black"
                        />
                }
            </div>
        </div>
    )
}

export { InputPassword };
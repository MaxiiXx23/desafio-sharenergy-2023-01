import { InputHTMLAttributes, useState } from "react";
import { IconProps } from "phosphor-react";

import styles from "./styles.module.css";


interface IProps extends InputHTMLAttributes<HTMLInputElement>{
    IconName: IconProps;
    type: "number" | "text" | "email";
    placeholder: string;
    name: string;
}

function Input({
    IconName,
    type,
    placeholder,
    name,
    ...rest
}: IProps) {

    const [isFocus, setIsFocus] = useState(false);

    function handleInputFocus() {
        setIsFocus((prevent) => !prevent);
    }

    return (
        <div className={isFocus ? styles.containerInputFocus : styles.containerInput}>
            <>
                {IconName}
            </>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                style={{
                    textAlign: 'center',
                }}
                onFocus={handleInputFocus}
                onBlur={() => setIsFocus(false)}
                {...rest}
            />
        </div>
    )
}

export { Input };
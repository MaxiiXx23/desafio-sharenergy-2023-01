import { ButtonHTMLAttributes } from "react";
import { IconProps } from "phosphor-react";

import styles from "./styles.module.css";


interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    IconName: IconProps;
}

export function ButtonModal({ IconName, ...rest }: IProps) {

    return (
        <button
            className={styles.btnClose}
            {...rest}
        >
            <>
                {IconName}
            </>
        </button>
    )

}
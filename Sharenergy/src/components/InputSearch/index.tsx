import { InputHTMLAttributes, useState } from "react";

import { MagnifyingGlass } from "phosphor-react";

import styles from "./styles.module.css";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    handleFetchCEP: () => void;
}


export function InputSearch({ handleFetchCEP, ...rest }: IProps) {



    return (
        <div className={styles.containerInput}>
            <input
                type="text"
                name="search"
                style={{ textAlign: 'center' }}
                placeholder="pesquisar..."
                {...rest}
            />
            <button
                className={styles.btn}
                type="submit"
            >
                <MagnifyingGlass
                    size={18}
                    color="white"
                />
            </button>
        </div>
    )
}
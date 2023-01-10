import styles from "./styles.module.css";

import Logo from "../../assets/logo.svg"
import Wave from "../../assets/wave.svg";

export function Footer() {

    return (
        <div className={styles.containerMain}>
            <img src={Wave} className={styles.backgroundImg} />
            <div className={styles.containerInfos}>
                <img src={Logo} alt="Logo Sharenergy" />
                <strong>Desafio Sharenergy</strong>
                <span>Copyright © 2023 Max Developer Inc. All rights reserved.</span>
            </div>
        </div>
    )

}
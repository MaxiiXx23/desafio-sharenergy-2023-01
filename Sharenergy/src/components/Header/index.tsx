import styles from "./styles.module.css"
import { Link } from 'react-router-dom'
import { List, X } from "phosphor-react"

import Logo from "../../assets/logo.svg"
import { useAuth } from "../../hooks/auth"
import { useState } from "react"


export function Header() {

    const { signed, signOut } = useAuth();
    const [isOpenMenuBurguer, setIsOpenMenuBurguer] = useState(false);

    function handleSignOut() {
        setIsOpenMenuBurguer(false);
        document.body.style.overflow = "auto";
        signOut();
    }

    function handleCloseMenuBurguer() {
        setIsOpenMenuBurguer(false);
        document.body.style.overflow = "auto";
    }

    function handleOpenMenuBurguer() {
        setIsOpenMenuBurguer((prevent) => !prevent);
        if (!isOpenMenuBurguer) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }

    return (
        <header className={
            isOpenMenuBurguer ? styles.headerOpen : styles.header
        }
        >
            <div className={
                isOpenMenuBurguer ? styles.wrapperMenuburguerOpen
                    : styles.wrapperMenuburguer
            }
            >
                <div className={styles.containerLogo}>
                    <img src={Logo} alt="Logo Sharenergy" />
                    <strong>Desafio</strong>
                </div>
                {
                    isOpenMenuBurguer ?
                        <div className={styles.listBtn} onClick={handleOpenMenuBurguer}>
                            <X color="white" size={18} />
                        </div>
                        :
                        <div className={styles.listBtn} onClick={handleOpenMenuBurguer}>
                            <List color="white" size={18} />
                        </div>
                }
            </div>
            <div className={styles.menuContainer}>
                <ul>
                    {
                        signed ? null :
                            <div className={
                                isOpenMenuBurguer ? styles.navOpen : styles.nav
                            }
                            >
                                <Link
                                    to="/"
                                    className="linkBtn"
                                    onClick={handleCloseMenuBurguer}
                                >
                                    <li className={styles.loginBtn}>Login</li>
                                </Link>
                            </div>
                    }
                    {
                        signed ?
                            <div className={
                                isOpenMenuBurguer ? styles.navOpen : styles.nav
                            }
                            >

                                <Link
                                    to="/listUsers"
                                    className="linkBtn"
                                    onClick={handleCloseMenuBurguer}
                                >
                                    <li>
                                        Lista
                                    </li>
                                </Link>
                                <Link
                                    to="/httpCat"
                                    className="linkBtn"
                                    onClick={handleCloseMenuBurguer}
                                >
                                    <li >
                                        HttpCat
                                    </li>
                                </Link>
                                <Link
                                    to="/randomDog"
                                    className="linkBtn"
                                    onClick={handleCloseMenuBurguer}
                                >
                                    <li>
                                        RandomDog
                                    </li>
                                </Link>
                                <Link
                                    to="/clients"
                                    className="linkBtn"
                                    onClick={handleCloseMenuBurguer}
                                >
                                    <li>
                                        Clientes
                                    </li>
                                </Link>
                                {
                                    signed ? <li onClick={handleSignOut}>sair</li> : null
                                }
                            </div>
                            : null
                    }
                </ul>
            </div>
        </header>
    )
}
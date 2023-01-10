import { useState, useEffect, FormEvent } from "react";

import axios from "axios";
import { CaretLeft, CaretRight, MagnifyingGlass } from "phosphor-react";

import styles from "./styles.module.css";
import { Input } from "../../components/Input";

interface IResponse {
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    name: {
        first: string;
        last: string;
        title: string;
    };
    email: string;
    login: {
        uuid: string;
        username: string;
    };
    dob: {
        age: string;
    };
}

interface IUsers {
    page: number;
    id: string;
    photo: string;
    name: string;
    email: string;
    username: string;
    age: string;
}

const usersSessionStorageKey = "@challenge:users";

export function ListUsers() {

    const [listUsers, setListUsers] = useState<IUsers[]>([]);
    const [listFiltered, setListFiltered] = useState<IUsers[]>([]);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isToLogingNextPage, setIsToLogingNextPage] = useState(true);
    const [search, setSearch] = useState("");

    async function getListUsers() {
        try {

            const response = await axios.get(
                `https://randomuser.me/api/?page=${pageCurrent}&results=10`
            );

            let { data } = response;

            const users = data.results.map((result: IResponse) => {

                let { picture, name, email, login, dob } = result;

                const user: IUsers = {
                    page: pageCurrent,
                    id: login.uuid,
                    name: `${name.first} ${name.last}`,
                    email,
                    photo: picture.thumbnail,
                    username: login.username,
                    age: dob.age

                }
                return user;
            });

            let usersOnStorage = sessionStorage.getItem(usersSessionStorageKey);

            let usersOnStorageParsed;

            if (usersOnStorage !== null) {
                usersOnStorageParsed = JSON.parse(usersOnStorage);
            }

            if (usersOnStorageParsed) {
                sessionStorage.setItem(usersSessionStorageKey, JSON.stringify([...usersOnStorageParsed, ...users]));

            } else {
                sessionStorage.setItem(usersSessionStorageKey, JSON.stringify([...users]));
            }

            setListUsers([]);

            setListUsers([...users]);
            setListFiltered([...users]);

        } catch (error) {
            const { message } = error as Error;
            console.log(message)
        }
    }

    async function loadingSessionStorage() {

        let usersOnStorage = sessionStorage.getItem(usersSessionStorageKey);

        let usersOnStorageParsed;

        if (usersOnStorage !== null) {
            usersOnStorageParsed = JSON.parse(usersOnStorage);

            let data = usersOnStorageParsed.filter((users: IUsers) => users.page === pageCurrent);

            setListFiltered([...data]);
        }
    }

    async function handleChangePageNext() {
        const current = pageCurrent;
        if (current < 5 && totalPages < 4) {
            setIsToLogingNextPage(true);
            setTotalPages((prevent) => prevent + 1);
            setPageCurrent(current + 1);
            return;
        } else if (current >= 1 && current <= 4) {
            setIsToLogingNextPage(false);
            setPageCurrent(current + 1);
            return;
        }
        return;
    }

    function handleChangePagePrevious() {
        const current = pageCurrent;
        if (current !== 1) {
            setIsToLogingNextPage(false);
            setPageCurrent(current - 1);
        }
        return;
    }

    function handleSubmitSearch(event: FormEvent): void {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            search: { value: string };
        };

        setListFiltered([...listUsers])

        const users = listFiltered.filter((user) =>
            user.name === target.search.value ||
            user.username === target.search.value ||
            user.email === target.search.value
        );

        if (users.length <= 0) {
            return;
        }

        setListFiltered([...users])

    }

    useEffect(() => {
        if (pageCurrent === 1 && isToLogingNextPage) {
            sessionStorage.removeItem(usersSessionStorageKey)
            getListUsers();
        } else if (isToLogingNextPage) {
            getListUsers();
        } else {
            loadingSessionStorage();
        }

    }, [pageCurrent])

    return (

        <div className={styles.containerMain}>

            <form onSubmit={handleSubmitSearch}>
                <div className={styles.wrapperInput}>
                    <label>
                        <span>Pesquisar:</span>
                        <Input
                            IconName={<MagnifyingGlass color="black" size={20} />}
                            name="search"
                            placeholder="Procure um usuário"
                            type="text"
                            onChange={handleSubmitSearch}
                        />
                    </label>

                </div>
            </form>
            <div className={styles.containerList}>
                <div className={styles.contaienrBtns}>
                    <button onClick={handleChangePagePrevious}>
                        <CaretLeft
                            color="white"
                        />
                    </button>
                    <span>{pageCurrent}</span>
                    <button onClick={handleChangePageNext}>
                        <CaretRight
                            color="white"
                        />
                    </button>
                </div>
                {
                    listFiltered.map((user) => (
                        <div
                            className={styles.containerCard}
                            key={user.id}
                        >

                            <div className={styles.wrapperImg}>
                                <img src={user.photo} alt="" />
                                <strong>{user.username}</strong>
                            </div>

                            <div className={styles.wrapperInfos}>
                                <p>{user.email}</p>
                                <p>{user.name}</p>
                                <p>{user.age}</p>
                            </div>
                        </div>
                    ))
                }
                <div className={styles.contaienrBtns}>
                    <button onClick={handleChangePagePrevious}>
                        <CaretLeft
                            color="white"
                        />
                    </button>
                    <span>{pageCurrent}</span>
                    <button onClick={handleChangePageNext}>
                        <CaretRight
                            color="white"
                        />
                    </button>
                </div>
            </div>
        </div>
    )

}
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLottie } from "lottie-react";


import { House, Pencil, Plus, Trash } from "phosphor-react";


import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";

import styles from "./styles.module.css";

import { AddressModal } from "../../components/AddressModel";
import { EditModal } from "../../components/EditModal";
import { ButtonModal } from "../../components/ButtonModal";
import clientAnimeted from "../../assets/client-meeting.json";




interface IClient {
    _id: string;
    name: string;
    email: string;
    telefone: string;
    cpf: string;
    endereco: string;
}

interface IClients {
    listClient: IClient[];
}


export function Clients() {

    const { signOut } = useAuth();

    const [clients, setClients] = useState<IClient[]>([]);
    const [refresh, setRefresh] = useState(false);
    const [idAddress, setIdAddress] = useState("");
    const [idClient, setIdClient] = useState("");

    const navigate = useNavigate();

    const options = {
        animationData: clientAnimeted,
        loop: true,
        style: {
            width: 400,
            height: 400
        }
    };

    const { View: ViewAnimated } = useLottie(options);

    const [isOpenAddressModal, setIsOpenAddressModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);

    async function loadingClients() {

        try {

            const response: AxiosResponse<IClients> = await api.get("/client/list");

            const { listClient } = response.data;

            setClients(listClient);

        } catch {
            toast.info('Por favor, faça login novamente.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            await signOut();
        }

    }

    function handleLoagingPage() {
        setRefresh((prevent) => !prevent);
    }

    function handleOpenAddressModel(id: string) {
        setIdAddress(id);
        setIsOpenAddressModal(true);
    }
    function handleCloseAddressModel() {
        setIsOpenAddressModal(false);
    }

    function handleOpenEditModel(id: string) {
        setIdClient(id);
        setIsOpenEditModal(true);
    }
    function handleCloseEditModel() {
        setIsOpenEditModal(false);
    }

    async function handleConfirmRemove(id: string) {
        try {
            await api.delete(`/client/delete/${id}`);
            setRefresh((prevent) => !prevent);
            toast.info('Cliente Removido.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            toast.error('Error ao remover o cliente.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    function handleNavigateAddClient() {
        navigate("/addClient");
    }

    useEffect(() => {
        loadingClients();
    }, [refresh])

    return (
        <>

            <div className={styles.containerMain}>
                <div className={styles.containerList}>
                    <strong>Clientes</strong>
                    <div className={styles.wrapperAdd}>
                        <span>Adicionar um novo cliente:</span>
                        <button
                            className={styles.btnAddress}
                            title="Adicionar"
                            onClick={handleNavigateAddClient}
                        >
                            <Plus
                                color="white"
                                size={18}
                            />
                        </button>
                    </div>
                    {
                        clients.length > 0 ?
                            clients.map((client) => (
                                <div key={client._id} className={styles.card}>
                                    <header className={styles.wrapperHeader}>
                                        <span
                                            className={styles.name}
                                        >
                                            {client.name}
                                        </span>
                                        <div className={styles.wrapperBtns}>
                                            <button
                                                className={styles.btnEdit}
                                                title="Editar"
                                                onClick={() => handleOpenEditModel(client._id)}
                                            >
                                                <Pencil
                                                    color="white"
                                                    size={18}
                                                />
                                            </button>
                                            <ButtonModal
                                                IconName={<Trash color="white" size={18} />}
                                                title="Remover"
                                                onDoubleClick={() => handleConfirmRemove(client._id)}
                                            />
                                        </div>
                                    </header>
                                    <div className={styles.wrapperInfos}>
                                        <p>
                                            <span className={styles.labelInfo}>Email: </span>
                                            <span>{client.email}</span>
                                        </p>
                                        <p>
                                            <span className={styles.labelInfo}>Telefone: </span>
                                            <span>{client.telefone}</span>
                                        </p>
                                        <p>
                                            <span className={styles.labelInfo}>CPF: </span>
                                            <span>{client.cpf}</span>
                                        </p>
                                    </div>
                                    <div className={styles.wrapperAddress}>
                                        <span>Vizualizar endereço:</span>
                                        <button
                                            className={styles.btnAddress}
                                            title="Endereço"
                                            onClick={() => handleOpenAddressModel(client.endereco)}
                                        >
                                            <House
                                                color="white"
                                                size={18}
                                            />
                                        </button>
                                    </div>
                                </div>
                            ))
                            : ViewAnimated
                    }
                </div>
            </div>
            {
                isOpenAddressModal ?
                    <AddressModal
                        id={idAddress}
                        onClick={handleCloseAddressModel}
                    />
                    : null
            }
            {
                isOpenEditModal ?
                    <EditModal
                        handleLoagingPage={handleLoagingPage}
                        idClient={idClient}
                        onClick={handleCloseEditModel}
                    />
                    : null
            }
        </>
    )

}


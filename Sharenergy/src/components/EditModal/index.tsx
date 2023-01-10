import { ButtonHTMLAttributes, useEffect, useState } from "react"

import { User, X, Envelope, Phone, IdentificationCard } from "phosphor-react";

import styles from "./styles.module.css";
import { ButtonModal } from "../ButtonModal";
import { Input } from "../Input";

import { api } from "../../services/api";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    idClient: string;
    handleLoagingPage: () => void;
}

interface IResponse {
    client: {
        _id: string;
        name: string;
        email: string;
        telefone: string;
        cpf: string;
    }
}

export function EditModal({ idClient, handleLoagingPage, ...rest }: IProps) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [cpf, setCPF] = useState("");


    async function loadingDataClient() {
        const response: AxiosResponse<IResponse> = await api.get(`/client/select/${idClient}`);

        const { client } = response.data;

        setName(client.name);
        setEmail(client.email);
        setPhone(client.telefone);
        setCPF(client.cpf);
    }

    async function handleUpdateClient() {
        if (!name) {
            toast.info('Nome inválido.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        } else if (!email) {
            toast.info('E-mail inválido.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (phone.length < 11) {
            toast.info('Telefone inválido.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (cpf.length < 11) {
            toast.info('CPF inválido.', {
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

        try {
            await api.put(`/client/update/${idClient}`, {
                name,
                email,
                telefone: phone,
                cpf
            });

            toast.success('Dados Atualizados com sucesso!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            handleLoagingPage();

        }catch(error){
            console.log(error)
            toast.error('Error ao atualizar', {
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

    useEffect(() => {
        loadingDataClient();
    }, [])


    return (
        <div className={styles.modal}>

            <div className={styles.modalContent}>
                <header className={styles.wrapperHeader}>
                    <strong>Editar cliente</strong>
                    <ButtonModal
                        IconName={<X color="white" size={18} />}
                        {...rest}
                    />
                </header>
                <div className={styles.wrapperLabels}>
                    <label>
                        <span>Nome:</span>
                        <Input
                            IconName={<User color="black" size={18} />}
                            name="name"
                            placeholder="Digite o nome"
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </label>
                    <label>
                        <span>E-mail:</span>
                        <Input
                            IconName={<Envelope color="black" size={18} />}
                            name="email"
                            placeholder="Digite um e-mail"
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </label>
                    <label>
                        <span>Telefone:</span>
                        <Input
                            IconName={<Phone color="black" size={18} />}
                            name="phone"
                            placeholder="Digite um telefone"
                            type="text"
                            maxLength={11}
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                        />
                    </label>
                    <label>
                        <span>CPF:</span>
                        <Input
                            IconName={<IdentificationCard color="black" size={18} />}
                            name="cpf"
                            placeholder="Digite um CPF"
                            type="text"
                            maxLength={11}
                            onChange={(e) => setCPF(e.target.value)}
                            value={cpf}
                        />
                    </label>
                </div>
                <button
                    className={styles.btnSubmit}
                    onClick={handleUpdateClient}
                >
                    Atualizar
                </button>
            </div>

        </div>
    )
}
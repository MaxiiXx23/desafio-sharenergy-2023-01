import { ButtonHTMLAttributes, FormEvent, useEffect, useState } from "react"
import { toast } from 'react-toastify';

import { MapPin, X } from "phosphor-react";
import { AxiosResponse } from "axios";

import styles from "./styles.module.css";
import { api } from "../../services/api";
import { Input } from "../Input";
import { InputSearch } from "../InputSearch";
import { ButtonModal } from "../ButtonModal";


interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {

    id: string;

}

interface IAddress {
    _id: string;
    cep: string;
    public_place: string;
    number: string;
    city: string;
    state: string;
    district: string;
    complement: string;
    reference: string;
}

export function AddressModal({ id, ...rest }: IProps) {

    const [cep, setCep] = useState("");
    const [publicPlace, setPublicPlace] = useState("");
    const [number, setNumber] = useState("");
    const [complement, setComplement] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [reference, setReference] = useState("");

    async function fetchAddress() {
        const response: AxiosResponse<IAddress> = await api.get(`/address/select/${id}`);
        const { data } = response;
        setCep(data.cep);
        setPublicPlace(data.public_place);
        setNumber(data.number);
        setComplement(data.complement);
        setDistrict(data.district);
        setCity(data.city);
        setState(data.state);
        setReference(data.reference);
    }

    async function handleFetchCEP(event: FormEvent) {
        event.preventDefault();
        if (cep.length < 8) {
            toast.info('CEP inválido para busca.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            await fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then((response) => {
                    const data = response.json();
                    data.then((result) => {
                        setPublicPlace(result.logradouro);
                        setDistrict(result.bairro);
                        setCity(result.localidade);
                        setState(result.uf);

                        // limpo campos 
                        setNumber("")
                        setComplement("")
                        setReference("")
                    })
                })
                .catch((error) => {
                    toast.info('CEP não encontrado!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
        }
    }

    async function handleUpdateAddressClient(){
        if(!cep){
            toast.error('CEP inválido.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else if(!number){
            toast.error('Número não informado.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        try {
            await api.put(`/address/update/${id}`, {
                cep,
                public_place: publicPlace,
                number,
                city,
                state,
                district,
                complement,
                reference
            });

            toast.success('Endereço atualizado com sucesso.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }catch(error){
            const { message } = error as Error;
            console.log(message)
        }

    }

    useEffect(() => {
        fetchAddress();
    }, []);

    return (
        <div className={styles.modal}>

            <div className={styles.modalContent}>
                <div className={styles.wrapperAsk}>
                    <strong>Endereço</strong>
                   <ButtonModal 
                        IconName={<X color="white" size={18} />}
                        {...rest}
                   />
                </div>
                <div className={styles.wrapperInfo}>
                    <form onSubmit={handleFetchCEP}>
                        <label>
                            <span>CEP:</span>
                            <InputSearch
                                handleFetchCEP={() => handleFetchCEP}
                                maxLength={8}
                                onChange={(e) => setCep(e.target.value)}
                                value={cep}
                            />
                        </label>
                        <label>
                            <span>Rua:</span>
                            <Input
                                IconName={<MapPin color="black" />}
                                name="publicPlace"
                                placeholder="Digite sua rua"
                                type="text"
                                value={publicPlace}
                                disabled
                            />
                        </label>
                        <label>
                            <span>Número:</span>
                            <Input
                                IconName={<MapPin color="black" />}
                                name="number"
                                placeholder="Digite o número"
                                type="text"
                                onChange={(e) => setNumber(e.target.value)}
                                value={number}
                            />
                        </label>
                        <label>
                            <span>Complemento:</span>
                            <Input
                                IconName={<MapPin color="black" />}
                                name="complement"
                                placeholder="Digite o complemento"
                                type="text"
                                onChange={(e) => setComplement(e.target.value)}
                                value={complement}
                            />
                        </label>
                        <label>
                            <span>Referência:</span>
                            <Input
                                IconName={<MapPin color="black" />}
                                name="reference"
                                placeholder="Digite a referência"
                                type="text"
                                onChange={(e) => setReference(e.target.value)}
                                value={reference}
                            />
                        </label>
                        <label>
                            <span>Bairro:</span>
                            <Input
                                IconName={<MapPin color="black" />}
                                name="district"
                                placeholder="Digite um bairro"
                                type="text"
                                value={district}
                                disabled
                            />
                        </label>
                        <label>
                            <span>Cidade</span>
                            <Input
                                IconName={<MapPin color="black" />}
                                name="city"
                                placeholder="Digite a cidade"
                                type="text"
                                value={city}
                                disabled
                            />
                        </label>
                        <label>
                            <span>Estado:</span>
                            <Input
                                IconName={<MapPin color="black" />}
                                name="state"
                                placeholder="Digite o estado"
                                type="text"
                                value={state}
                                disabled
                            />
                        </label>
                    </form>
                </div>
                <button
                    className={styles.btnSubmit} 
                    onClick={handleUpdateAddressClient}
                >
                    Atualizar
                </button>
            </div>

        </div>
    )
}
import { FormEvent, useState } from "react";

import {
    ArrowLeft,
    Envelope,
    IdentificationBadge,
    MapPin,
    Phone,
    User
} from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { AxiosResponse } from "axios";


import styles from "./styles.module.css";
import { Input } from "../../components/Input";
import { ButtonModal } from "../../components/ButtonModal";
import { InputSearch } from "../../components/InputSearch";
import { Stages } from "../../components/Stages";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";


interface IResponse {
    adress_id: string;
}

export function AddClient() {

    // dados Cliente
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [cpf, setCPF] = useState("");

    // Dados Endereço
    const [cep, setCep] = useState("");
    const [publicPlace, setPublicPlace] = useState("");
    const [number, setNumber] = useState("");
    const [complement, setComplement] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [reference, setReference] = useState("");

    // navigação de etapa
    const [isStageDataClient, setIsStageDataClient] = useState(true);

    const navigate = useNavigate();
    const { signOut } = useAuth();

    function handleGoBack() {
        navigate("/clients")
    }

    async function handleGoNextStage() {

        const schema = Yup.object().shape({
            cpf: Yup.string()
            .required('CPF é obrigatório.')
            .length(11, 'CPF inválido'),
            phone: Yup.string()
            .required('Número de telefone é obrigatório.')
            .length(11, 'Número de telefone inválido'),
            email: Yup.string()
            .required('E-mail é obrigatório.')
            .email('E-mail inválido'),
            name: Yup.string()
                .required('Nome é obrigatório.'),
        });

        try {
            await schema.validate({ name, email, phone, cpf });
            setIsStageDataClient(false);
        } catch (err) {
            let error = err as Yup.ValidationError;
            toast.info(`${error.message}`, {
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

    function handleGoBackStage() {
        setIsStageDataClient(true);
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

    async function handleAddClient(){

        const schema = Yup.object().shape({
            number: Yup.string()
            .required('Número do endereço é obrigatório.'),
            state: Yup.string()
            .required('Por favor efeturar a busca do CEP.'),
            cep: Yup.string()
            .required('CEP é obrigatório.')
            .length(8, 'CEP inválido'),
        });

        try{
            await schema.validate({ cep, state, number});
            const response: AxiosResponse<IResponse> = await api.post("/address/create", {
                cep,
                public_place: publicPlace,
                number,
                complement,
                reference,
                district,
                city,
                state,
            });

            const { adress_id } = response.data;

            await api.post("/client", {
                name,
                email,
                telefone: phone,
                endereco: adress_id,
                cpf
            });
            toast.success("Cliente criado com sucesso.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate("/clients")

        }catch(error){
            if(error instanceof Yup.ValidationError){
                toast.info(`${error.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }else {
                toast.info("Erro ao cadastrar o cliente.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                await signOut();
            }
        }

    }

    return (
        <div className={styles.containerMain}>
            <div className={styles.containerContent}>
                {
                    isStageDataClient ?
                        <div className={styles.containerCard}>
                            <ButtonModal
                                IconName={<ArrowLeft color="white" />}
                                onClick={handleGoBack}
                            />
                            <header className={styles.wrapperHeader}>
                                <strong>Dados do Cliente</strong>
                                <Stages
                                    isStageDataClient={isStageDataClient}
                                />
                            </header>
                            <div className={styles.wrapperLabels}>
                                <label>
                                    <span>Nome:</span>
                                    <Input
                                        IconName={<User color="black" size={18} />}
                                        name="name"
                                        type="text"
                                        placeholder="Digite o nome"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                    />
                                </label>
                                <label>
                                    <span>E-mail:</span>
                                    <Input
                                        IconName={<Envelope color="black" size={18} />}
                                        name="email"
                                        type="email"
                                        placeholder="Digite o e-mail"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                    />
                                </label>
                                <label>
                                    <span>Telefone:</span>
                                    <Input
                                        IconName={<Phone color="black" size={18} />}
                                        name="phone"
                                        type="text"
                                        maxLength={11}
                                        placeholder="Digite o telefone"
                                        onChange={(e) => setPhone(e.target.value)}
                                        value={phone}
                                    />
                                </label>
                                <label>
                                    <span>CPF:</span>
                                    <Input
                                        IconName={<IdentificationBadge color="black" size={18} />}
                                        name="cpf"
                                        type="text"
                                        maxLength={11}
                                        placeholder="Digite o CPF"
                                        onChange={(e) => setCPF(e.target.value)}
                                        value={cpf}
                                    />
                                </label>
                            </div>
                            <button
                                className={styles.btnNext}
                                onClick={handleGoNextStage}
                            >
                                Próximo
                            </button>
                        </div>
                        :
                        <div className={styles.containerCard}>
                            <ButtonModal
                                IconName={<ArrowLeft color="white" />}
                                onClick={handleGoBackStage}
                            />
                            <header className={styles.wrapperHeader}>
                                <strong>Endereço</strong>
                                <Stages
                                    isStageDataClient={isStageDataClient}
                                />
                            </header>
                            <div className={styles.wrapperLabels}>
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
                                        <span>Cidade:</span>
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
                                className={styles.btnNext}
                                onClick={handleAddClient}
                            >
                                Cadastrar
                            </button>
                        </div>
                }
            </div>
        </div>
    )

}
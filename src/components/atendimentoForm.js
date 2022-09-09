import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Swal from "sweetalert2";

import { Button, Form, Input } from "./style";

export default function SignUpForm() {
    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState("enabled");

    const [atendimentoInfos, setatendimentoInfos] = useState({
        status: "",
        produto: "",
        cliente: "",
        responsavel: "",
        troca_de_peca:"",
        descricao:""
    })

    const handleChanges = (e) => { setatendimentoInfos({ ...atendimentoInfos, [e.target.name]: e.target.value }) };
    const AlertObject = (icon, title, text) => {
        return {
            icon: icon,
            title: title,
            text: text,
            color: `#FFFFFF`,
            background: `#333333`,
            confirmButtonColor: `#1877F2`,
            padding: `10px`,
            timer: 2000,
            timerProgressBar: true,
            timerProgressBar: `#ffffff`
        }
    }
    const AlertSucess = (result) => {
        if (result.isConfirmed === true || result.isDismissed === true) return navigate("/")
    }
    const AlertError = (result) => {
        if (result.isConfirmed === true || result.isDismissed === true) return setIsDisabled("enabled")
    }

    const handleIsEmpty = () => {
        if ( atendimentoInfos.email === "" || atendimentoInfos.username === "" || atendimentoInfos.password === "" || atendimentoInfos.pictureUrl === "" ) {
            Swal.fire(AlertObject(
                "warning",
                "Oops...",
                "Você deve preencher todos os campos!"
            )).then(AlertError);
        }
    }

    const handleAtendimentoRegistration = async (e) => {
        e.preventDefault();
        setIsDisabled("disabled");
        handleIsEmpty();

        const promise = axios.post(`http://localhost:5000/atendimento`, atendimentoInfos);
        promise.then((res) => {
            Swal.fire(AlertObject(
                'success',
                'Good job!',
                'Cadastro realizado com sucesso!'
            )).then(AlertSucess);
        })
        promise.catch((e) => {
            Swal.fire(AlertObject(
                "error",
                "Oops...",
                e.response.status === 409 ? 'Já existe, tente novamente!' : 'Falha ao realizar cadastro!'
            )).then(AlertError);
        })
    }



    return (
        <Form 
            onSubmit={handleAtendimentoRegistration}
            className={isDisabled}
        >
            <Input
                type="status"
                placeholder="status"
                id="statusInput"
                value={atendimentoInfos.status}
                name="status"
                onChange={handleChanges}
            />
            <Input
                type="produto"
                placeholder="produto"
                id="produtoInput"
                value={atendimentoInfos.produto}
                name="produto"
                onChange={handleChanges}
            />
            <Input
                type="cliente"
                placeholder="cliente"
                id="clienteInput"
                value={atendimentoInfos.cliente}
                name="cliente"
                onChange={handleChanges}
            />
            <Input
                type="responsavel"
                placeholder="responsavel"
                id="responsavelInput"
                value={atendimentoInfos.responsavel}
                name="responsavel"
                onChange={handleChanges}
            />
            <Input
                type="troca_de_peca"
                placeholder="troca_de_peca"
                id="troca_de_pecaInput"
                value={atendimentoInfos.troca_de_peca}
                name="troca_de_peca"
                onChange={handleChanges}
            />
            <Input
                type="descricao"
                placeholder="descricao"
                id="descricaoInput"
                value={atendimentoInfos.descricao}
                name="descricao"
                onChange={handleChanges}
            />
            <Button type="submit">
                {
                    isDisabled === "disabled"
                        ? `SignUp ...`
                        : `SignUp `
                }
            </Button>
            <Link to='/'>
                Switch back to log in
            </Link>
        </Form>
    )
}
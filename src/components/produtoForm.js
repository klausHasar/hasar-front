import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Swal from "sweetalert2";

import { Button, Form, Input } from "./style";

export default function SignUpForm() {
    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState("enabled");

    const [produtoInfos, setprodutoInfos] = useState({
        marca: "",
        modelo: "",
        dono: "",
        responsavel: "",
        rotulos:""
    })

    const handleChanges = (e) => { setprodutoInfos({ ...produtoInfos, [e.target.name]: e.target.value }) };
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
        if ( produtoInfos.email === "" || produtoInfos.username === "" || produtoInfos.password === "" || produtoInfos.pictureUrl === "" ) {
            Swal.fire(AlertObject(
                "warning",
                "Oops...",
                "Você deve preencher todos os campos!"
            )).then(AlertError);
        }
    }

    const handleprodutoRegistration = async (e) => {
        e.preventDefault();
        setIsDisabled("disabled");
        handleIsEmpty();

        const promise = axios.post(`http://localhost:5000/produto`, produtoInfos);
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
            onSubmit={handleprodutoRegistration}
            className={isDisabled}
        >
            <Input
                type="marca"
                placeholder="marca"
                id="marcaInput"
                value={produtoInfos.marca}
                name="marca"
                onChange={handleChanges}
            />
            <Input
                type="modelo"
                placeholder="modelo"
                id="modeloInput"
                value={produtoInfos.modelo}
                name="modelo"
                onChange={handleChanges}
            />
            <Input
                type="dono"
                placeholder="dono"
                id="donoInput"
                value={produtoInfos.dono}
                name="dono"
                onChange={handleChanges}
            />
            <Input
                type="rotulos"
                placeholder="rotulos"
                id="rotulosInput"
                value={produtoInfos.rotulos}
                name="rotulos"
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
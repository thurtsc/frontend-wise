import React from "react";
import Input from "../Form/Input";
import Button from "../Form/Button";
import styles from "./LoginCreate.module.css";
import { useNavigate } from "react-router-dom";
import Api from "../../Api";

const LoginCreate = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const user = { name, email, password };

    const response = await Api.post("/users", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert("Cadastro efetuado com sucesso!");
    navigate("/");
  }

  return (
    <section className={`${styles.container} animeLeft`}>
      <h1 className="title">Cadastre-se</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Usuário"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          label="E-mail"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Senha"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button>Cadastrar</Button>
      </form>
    </section>
  );
};

export default LoginCreate;

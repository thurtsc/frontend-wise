import React from "react";
import styles from "./LoginForm.module.css";
import Input from "../Form/Input";
import Button from "../Form/Button";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../Api";

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const user = { email, password };

    const response = await Api.post("/login", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (localStorage.getItem("Bearer") !== null) {
      localStorage.removeItem("Bearer");
    }

    if (localStorage.getItem("Nome") !== null) {
      localStorage.removeItem("Nome");
    }

    localStorage.setItem("Bearer", response.data.token);
    localStorage.setItem("Nome", response.data.name);
    navigate("/conta");
  }

  return (
    <section className={`${styles.container} animeLeft`}>
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Usuário"
          type="text"
          name="username"
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
        <Button>Entrar</Button>
      </form>

      <Link to={"/criar"}>
        <div className={styles.cadastro}>
          <div>
            <h2 className={styles.subtitle}>Não tem conta?</h2>
            <p>Se cadastre gratuitamente</p>
          </div>
          <svg
            stroke="#333"
            fill="none"
            viewBox="0 0 20 20"
            width="20"
            height="20"
          >
            <path
              d="M7.50004 5C7.50004 5 12.5 8.68242 12.5 10C12.5 11.3177 7.5 15 7.5 15"
              stroke="#333"
              strokeWidth="1.25"
              strokeLinecap="round"
            ></path>
          </svg>
        </div>
      </Link>
    </section>
  );
};

export default LoginForm;

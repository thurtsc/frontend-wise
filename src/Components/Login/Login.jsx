import React from "react";
import styles from "./Login.module.css";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./LoginForm";
import LoginCreate from "./LoginCreate";

const Login = () => {
  return (
    <section className={styles.login}>
      <div className={styles.form}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="criar" element={<LoginCreate />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;

import React from "react";
import styles from "./User.module.css";
import UserHeaderNav from "./UserHeaderNav";
import { Route, Routes } from "react-router-dom";
import Painel from "../Painel/Painel";
import Historico from "../Historico/Historico";

const User = () => {
  return (
    <section className={styles.container}>
      <UserHeaderNav />
      <Routes>
        <Route path="/" element={<Painel />} />
        <Route path="historico" element={<Historico />} />
      </Routes>
    </section>
  );
};

export default User;

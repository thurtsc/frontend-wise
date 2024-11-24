import React from "react";
import styles from "./UserHeaderNav.module.css";
import { NavLink } from "react-router-dom";

const UserHeaderNav = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.content}>
        <NavLink className={styles.navlink} to={"/conta"} end>
          Painel
        </NavLink>
        <NavLink className={styles.navlink} to={"/conta/historico"}>
          Histórico
        </NavLink>
      </div>
    </nav>
  );
};

export default UserHeaderNav;

import React from "react";
import styles from "./Painel.module.css";
import CreateReceiveForm from "./CreateReceiveForm";
import Transactions from "./Transactions";
import Balence from "./Balence";

const Painel = () => {
  const token = localStorage.getItem("Nome");
  const [balanceUpdated, setBalanceUpdated] = React.useState(false);

  const handleBalanceUpdate = () => {
    setBalanceUpdated((prevState) => !prevState);
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.nome}>Olá, {token}</h1>
      <div className={styles.conteudo}>
        <div>
          <CreateReceiveForm onBalanceUpdate={handleBalanceUpdate} />
          <Balence className={styles.balance} balanceUpdated={balanceUpdated} />
        </div>
        <Transactions />
      </div>
    </section>
  );
};

export default Painel;

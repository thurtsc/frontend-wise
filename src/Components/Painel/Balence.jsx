import React from "react";
import styles from "./Balence.module.css";
import Api from "../../Api";

const Balence = ({ balanceUpdated }) => {
  const [balance, setBalance] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchBalance = async () => {
      const token = localStorage.getItem("Bearer");

      if (!token) {
        setError("Token não encontrado no localStorage");
        return;
      }

      try {
        const response = await Api.get("/balance", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const saldo = response.data.find((item) => item.tag === "saldo");

        if (saldo) {
          setBalance(saldo.saldo);
        } else {
          setError("Saldo não encontrado");
        }
      } catch (err) {
        setError("Erro ao buscar saldo" + err);
      }
    };

    fetchBalance();
  }, [balanceUpdated]);

  if (error) {
    return <div>{error}</div>;
  }

  if (balance === null) {
    return <div>Carregando...</div>;
  }

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1>Balanço:</h1>
        <span className={balance >= 0 ? styles.positive : styles.negative}>
          R$ {balance},00
        </span>
      </div>
    </section>
  );
};

export default Balence;

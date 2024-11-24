import React from "react";
import styles from "./Transactions.module.css";
import Api from "../../Api";

const Transactions = () => {
  const [receives, setReceives] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchReceives = async () => {
      const token = localStorage.getItem("Bearer");
      if (!token) {
        console.error("Token não encontrado no localStorage");
        setLoading(false);
        return;
      }

      try {
        const response = await Api.get("/receives", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReceives(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar recebimentos:", error);
        setLoading(false);
      }
    };

    fetchReceives();
  }, [receives]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <section className={styles.container}>
      <h1>Últimas transações</h1>
      {receives.slice(0, 3).map((receive) => (
        <div key={receive.id} className={styles.content}>
          <div className={styles.cima}>
            <h2>{receive.description}</h2>
          </div>
          <div className={styles.baixo}>
            <h2
              className={receive.type === "receita" ? styles.green : styles.red}
            >
              R$ {receive.value},00
            </h2>
            <span className={styles.data}>
              {new Date(receive.created_at).toLocaleDateString("pt-BR")}
            </span>
            <span className={styles.msg}>Sem nota.</span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Transactions;

import React from "react";
import { format, addMonths, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import styles from "./ReceivesList.module.css";
import Button from "../Form/Button";
import Api from "../../Api";

const ReceivesList = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [filteredData, setFilteredData] = React.useState([]);
  const [month, setMonth] = React.useState(new Date());
  const [filterType, setFilterType] = React.useState("todos");
  const [totals, setTotals] = React.useState({
    receitas: 0,
    despesas: 0,
    balanco: 0,
  });
  const token = localStorage.getItem("Nome");

  React.useEffect(() => {
    const fetchData = async () => {
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
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados da API", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [data]);

  React.useEffect(() => {
    const filtered = data.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getFullYear() === month.getFullYear() &&
        itemDate.getMonth() === month.getMonth() &&
        (filterType === "todos" || item.type === filterType)
      );
    });

    const receitas = filtered
      .filter((item) => item.type === "receita")
      .reduce((sum, item) => sum + item.value, 0);
    const despesas = filtered
      .filter((item) => item.type === "despesa")
      .reduce((sum, item) => sum + item.value, 0);
    const balanco = receitas - despesas;

    setFilteredData(filtered);
    setTotals({ receitas, despesas, balanco });
  }, [data, month, filterType]);

  const handlePrevMonth = () => {
    setMonth(subMonths(month, 1));
  };

  const handleNextMonth = () => {
    setMonth(addMonths(month, 1));
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("Bearer");
    if (token) {
      try {
        await Api.delete("/receives/delete", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { item_id: id },
        });
        setData((prevData) => prevData.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Erro ao excluir o registro", error);
      }
    } else {
      console.error("Token não encontrado no localStorage");
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.container}>
      <section className={styles.content}>
        <h1 className={styles.nome}>Olá, {token}</h1>
        <section className={styles.subcontainer}>
          <div className={styles.header}>
            <button onClick={handlePrevMonth}>{"<"}</button>
            <span>{format(month, "MMMM yyyy", { locale: ptBR })}</span>
            <button onClick={handleNextMonth}>{">"}</button>
          </div>

          <div className={styles.totals}>
            {filterType !== "despesa" && (
              <div>
                Receita
                <span style={{ color: "green" }}>
                  R$ {totals.receitas.toFixed(2)}
                </span>
              </div>
            )}
            {filterType !== "receita" && (
              <div>
                Despesa
                <span style={{ color: "red" }}>
                  R$ {totals.despesas.toFixed(2)}
                </span>
              </div>
            )}
            {filterType === "todos" && (
              <div>
                Balanço
                <span style={{ color: "#4f78b2" }}>
                  R$ {totals.balanco.toFixed(2)}
                </span>
              </div>
            )}
          </div>
        </section>

        <section className={styles.filters}>
          <Button
            className={filterType === "todos" ? styles.active : ""}
            onClick={() => handleFilterChange("todos")}
          >
            Todos
          </Button>
          <Button
            className={filterType === "receita" ? styles.active : ""}
            onClick={() => handleFilterChange("receita")}
          >
            Entradas
          </Button>
          <Button
            className={filterType === "despesa" ? styles.active : ""}
            onClick={() => handleFilterChange("despesa")}
          >
            Saídas
          </Button>
        </section>

        <div className={styles["table-container"]}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Valor</th>
                <th>Tipo</th>
                <th>Data</th>
                <th>Descrição</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td>{item.description}</td>
                  <td
                    style={{
                      color: item.type === "despesa" ? "red" : "green",
                    }}
                  >
                    R$ {item.value.toFixed(2)}
                  </td>
                  <td>{item.type}</td>
                  <td>{new Date(item.created_at).toLocaleDateString()}</td>
                  <td>Sem nota</td>
                  <td>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDelete(item.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ReceivesList;

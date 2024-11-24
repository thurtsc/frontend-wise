import React from "react";
import styles from "./CreateReceiveForm.module.css";
import Input from "../Form/Input";
import Button from "../Form/Button";
import Api from "../../Api";

const CreateReceiveForm = ({ onBalanceUpdate }) => {
  const [description, setDescription] = React.useState("");
  const [value, setValue] = React.useState("");
  const [type, setType] = React.useState("receita");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReceive = {
      description: description.toLowerCase(),
      value: parseFloat(value),
      type,
      date: new Date().toISOString().split("T")[0], // Garante o formato AAAA-MM-DD
    };

    const token = localStorage.getItem("Bearer");

    if (!token) {
      console.error("Token não encontrado no localStorage");
      return;
    }

    try {
      await Api.post("/receive", newReceive, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      onBalanceUpdate();

      setDescription("");
      setValue("");
      setType("receita");
    } catch (error) {
      console.error("Erro ao cadastrar recebimento:", error);
    }
  };

  return (
    <section className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Descrição"
          type="text"
          name="descricao"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Input
          label="Valor"
          type="number"
          name="valor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <Input
          label="Tipo"
          type="select"
          name="tipo"
          value={type}
          onChange={(e) => setType(e.target.value)}
          options={[
            { label: "Receita", value: "receita" },
            { label: "Despesa", value: "despesa" },
          ]}
        />

        <Button>Salvar</Button>
      </form>
    </section>
  );
};

export default CreateReceiveForm;

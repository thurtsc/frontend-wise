import React from "react";
import styles from "./Input.module.css";

const Input = ({ label, type, name, value, onChange, options }) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      {type === "select" ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={styles.input}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          className={styles.input}
          type={type}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default Input;

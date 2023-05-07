import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const Calculator = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (result !== null) {
      alert(`Result: ${result}`);
    }
  }, [result]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/calculate", {
        num1,
        num2,
        operation,
      });
      setResult(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="calculator">
      <h1>Simple Calculator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          step="any"
          name="num1"
          placeholder="Number 1"
          required
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
        />
        <select
          name="operation"
          required
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="add">+</option>
          <option value="subtract">-</option>
          <option value="multiply">*</option>
          <option value="divide">/</option>
        </select>
        <input
          type="number"
          step="any"
          name="num2"
          placeholder="Number 2"
          required
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
        />
        <button type="submit">Calculate</button>
      </form>
      {result !== null && <h2>Result: {result}</h2>}
    </div>
  );
};

export default Calculator;

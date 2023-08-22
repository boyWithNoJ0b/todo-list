import { useState } from "react";
import "./App.css";
import TodoTable from "./components/TodoTable";

function App() {
  return (
    <>
      <h1>todo-list</h1>
      <TodoTable />
    </>
  );
}

export default App;

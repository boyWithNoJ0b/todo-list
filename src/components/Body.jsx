import "./Body.css";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export default function Body() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (!newItem) {
      alert("Enter what to do");
      return;
    }

    setItems((odlItems) => {
      return [...odlItems, { text: newItem, id: uuid() }];
    });

    setNewItem("");
  };

  return (
    <div className="Body">
      <input
        type="text"
        className="todo-input"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button className="add-btn" onClick={() => addItem()}>
        ADD
      </button>
      <ul>
        {items.map((i) => {
          return <li key={i.id}>{i.text}</li>;
        })}
      </ul>
    </div>
  );
}

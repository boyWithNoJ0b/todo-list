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
      return [...odlItems, { text: newItem, id: uuid(), isDone: false }];
    });

    setNewItem("");
  };

  //helper function for adding style like this toDo is done
  const markAsDone = (id) => {
    setItems((oldItems) => {
      const markedItems = oldItems.map((item) => {
        if (item.id == id) {
          return { ...item, isDone: !item.isDone };
        }
        return item;
      });
      return markedItems;
    });
  };

  // function for deleting items
  const deleteItem = (id) => {
    setItems((oldItems) => {
      const filteredItems = oldItems.filter((item) => {
        if (item.id === id) {
          return false;
        } else {
          return true;
        }
      });
      return filteredItems;
    });
  };

  return (
    <div className="Body">
      <div className="input-container">
        <input
          type="text"
          className="todo-input"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button className="add-btn" onClick={() => addItem()}>
          ADD
        </button>
      </div>
      <ul>
        {items.map((i) => {
          return (
            <div key={i.id} className="todo-item">
              <li
                style={{
                  textDecoration: i.isDone && "line-through",
                  fontStyle: i.isDone && "italic",
                }}
                onClick={() => markAsDone(i.id)}>
                {i.text}
              </li>
              <button onClick={() => deleteItem(i.id)}>❌</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

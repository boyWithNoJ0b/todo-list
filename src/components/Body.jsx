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
      return [...odlItems, { text: newItem, id: uuid(), isDone: false, isEditing: false }];
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


  // for adding items in the todo list by clicking 'Enter' key
  const handleKeyDown = (event) => {
    if(event.key === "Enter") {
      const button = document.getElementsByClassName("add-btn")
      button[0].click()
    }
  }


  //helper function that return boolean value
  const isEditingAndIsDone = (item) => {
    return !item.isEditing && item.isDone;
  }
  

  //for editing the added item
  const editItem = (id) => {
    setItems((oldItems) => {
      const editedItems = oldItems.map(item => {
        if(item.id === id){
          return {
            ...item,
            isEditing: !item.isEditing,
            isDone: false,
          } 
        } else {
          return item
        }
      })
      return editedItems;
    })
  }
  
  

  return (
    <div className="Body">
      <div className="input-container">
        <input
          type="text"
          className="todo-input"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={handleKeyDown}
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
                key={i.id}
                contentEditable={i.isEditing}
                style={{
                  textDecoration: isEditingAndIsDone(i) && "line-through",
                  fontStyle: isEditingAndIsDone(i) && "italic",
                  position: "relative",
                }}
                onClick={() => markAsDone(i.id)}>
                {i.text}
              </li>
              <span style={{
                  fontSize: "18px",
                  position: "absolute",
                  contentEditable: "false",
                  right: "180px",
                  top: "3px"
                }}>{i.isEditing && "Edit items content here"}</span>
              <button onClick={() => deleteItem(i.id)}>❌</button>
              <button onClick={() => editItem(i.id)} >{i.isEditing ? "EDITING" : "EDIT"}</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

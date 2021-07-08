import { useState } from "react";
import { FiX } from "react-icons/fi";
import { useLists } from "../../contexts/listsContext";

import "./styles.scss";

export function AddList() {
  const [listName, setListName] = useState('');

  const { lists, addList } = useLists();

  const biggerPosition = lists.reduce((last, list) => {
    return last > list.position ? last : list.position
  }, 0);

  const nextPosition = (biggerPosition + 1);

  async function handleAddNewList() {
    const list = {
      name: listName,
      position: nextPosition
    };

    try {
      await addList(list);
    } catch(error) {
      console.log("Error on adding list", error);
    }
    
    setListName('');
  }

  return (
    <div className="add-list">
      <input 
        value={listName} 
        onChange={e => setListName(e.target.value)}
        placeholder="Insira o título da lista..."
      />
      <div className="actions">
        <button onClick={handleAddNewList}>Adicionar Lista</button>
        <FiX onClick={() => setListName("")} />
      </div>
    </div>
  )
}
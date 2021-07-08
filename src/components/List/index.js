import { useState } from "react";
import { FiX } from "react-icons/fi";
import { TiCreditCard } from "react-icons/ti";
import { MdReorder } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { useLists } from "../../contexts/listsContext";

import { Card } from "../Card";

import "./styles.scss";

export function List({ data: { list_id, name, cards, position } }) {
  const [currentName, setCurrentName] = useState(name);
  const [showDeleteListButton, setShowDeleteListButton] = useState(false);

  const { addCard, deleteList, updateList } = useLists();

  const biggerPosition = cards.reduce((last, card) => {
    return last > card.position ? last : card.position
  }, 0);

  function handleAddNewCard() {
    const cardName = prompt('Nome da nova tarefa');

    if(!cardName) return;

    const card = {
      title: cardName,
      position: biggerPosition + 1,
      list_id
    }

    addCard(card);
  }

  async function handleDeleteList() {
    try {
      await deleteList(list_id);
    } catch(e) {
      console.log("Error on deleting list", e);
    }
    
    setShowDeleteListButton(false);
  }

  async function handleUpdateList() {
    const updatedList = {
      list_id,
      name: currentName,
      position
    }

    await updateList(updatedList);

    setShowDeleteListButton(false);
  }

  async function handleChangeCardPosition(result) {
    if (!result.destination) return;

    const items = Array.from(cards);
    const overrideItem = items[result.destination.index];
    const draggabledItem = items[result.source.index];
    console.log('Next', overrideItem);
    console.log('Draggabled', draggabledItem);
  }

  return (
    <div className="list">
      <div className="list-header">
        <h3>{currentName}</h3>
        <div className="actions">
          <button
            onClick={() => setShowDeleteListButton(oldValue => !oldValue)}
            className="toogle-options"
          >
            <span>...</span>
          </button>
          { showDeleteListButton && (
              <div className="actions-list">
                <p>
                  <span>Ações da lista</span>
                  <FiX onClick={() => setShowDeleteListButton(false) } />
                </p>
                <div className="update-name">
                  <input 
                    value={currentName} 
                    onChange={event => setCurrentName(event.target.value)}  
                  />
                  <button
                    onClick={handleUpdateList}
                  >Atualizar</button>
                </div>
                <div className="sub-actions">
                  <button
                    onClick={handleDeleteList}
                  >Excluir lista...</button>
                  <button onClick={() => setShowDeleteListButton(false) }>Dispensar...</button>
                </div>
              </div>
          )}
        </div>
      </div>
      <DragDropContext onDragEnd={handleChangeCardPosition}>
        <Droppable droppableId={`cards-${list_id}`}>
          {(provided) => (
            <ul className={`cards cards-${list_id}`} {...provided.droppableProps} ref={provided.innerRef}>
              {cards.map((card, index) => (
                <Draggable key={String(card.card_id)} draggableId={String(card.card_id)} index={index}>
                  {(provided) => (
                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <div>
                        <MdReorder />
                        <Card
                          key={card.position} // Utiliza-se position para que seja um valor único quando um novo card for adicionado
                          data={card}
                        />
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <button 
        className="add-card"
        onClick={handleAddNewCard}
      >
        + Adicionar outro cartão
        <TiCreditCard />
      </button>
    </div>
  )
}
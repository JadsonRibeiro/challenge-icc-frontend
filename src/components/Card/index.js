import { useState } from "react";
import ReactModal from "react-modal";
import { FiX } from "react-icons/fi";
import { TiCreditCard } from "react-icons/ti";

import { useLists } from "../../contexts/listsContext";

import "./styles.scss";
import { forwardRef } from "react";

const modalStyles = {
  content: {
      top: '25%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      width: '55%',
      transform: 'translate(-50%, -50%)',
      border: '0',
      padding: '16px',
      borderRadius: '8px',
      backgroundColor: '#f4f5f7',
      boxShadow: 'rgb(0 0 0 / 23%) 0px 2px 12px'
  },
}

ReactModal.setAppElement("#root");

const CardBase = ({
  data,
  onCardUpdated = () => {},
  onCardDeleted = () => {}
}, ref) => {
  const [currentTitle, setCurrentTitle] = useState(data.title);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { updateCard, deleteCard } = useLists();

  function handleOpenEditCardModal() {
    setIsModalOpen(true);
  }

  async function handleUpdateCard() {
    const card = {
      ...data,
      title: currentTitle
    };

    try {
      await updateCard(card);
    } catch(e) {
      console.log("Error on updating card", e);
    }

    setIsModalOpen(false);
    onCardUpdated(card);
  }

  async function handleDeleteCard() {
    try {
      await deleteCard(data);
      onCardDeleted(data);
    } catch(error) {
      console.log("Error on deleting card", error);
    }
    
    setIsModalOpen(false);
  }

  return (
    <div 
      className="card-container"
      ref={ref}
    >
      <button
        onClick={handleOpenEditCardModal}
      >
        {currentTitle}
      </button>

      <ReactModal
        isOpen={isModalOpen}
        style={modalStyles}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <div className="modalContainer">
          <TiCreditCard />
          <div className="content">
            <input 
              value={currentTitle}
              onChange={event => setCurrentTitle(event.target.value)}
            />
            <p>na lista <span>Fazendo</span></p>
            <div className="actions">
              <button onClick={handleDeleteCard} className="delete-button">Excluir</button>
              <button onClick={handleUpdateCard} className="update-button">Salvar</button>
            </div>
          </div>
          <button onClick={() => setIsModalOpen(false)}>
            <FiX />
          </button>
        </div>
      </ReactModal>
    </div>
  )
}

export const Card = forwardRef(CardBase);
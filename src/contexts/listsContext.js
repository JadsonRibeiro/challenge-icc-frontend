import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

const ListsContext = createContext({});

export function ListsProvider({ children }) {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    api.get('/lists').then(({ data }) => {
      if(data) {
        setLists(data);
      }
    })
  }, []);

  async function addList(list) {
    await api.post('/lists', list);

    setLists(oldLists => [
      ...oldLists,
      {
        ...list,
        cards: []
      }
    ])
  }

  async function deleteList(listId) {
    await api.delete(`/lists/${listId}`);

    const listsCopy = lists.filter(list => list.list_id !== listId);

    setLists(listsCopy);
  }

  async function updateList(list) {
    await api.put(`/lists/${list.list_id}`, list);
  }

  async function addCard(card) {
    await api.post(`/lists/${card.list_id}/cards`, card);

    const listsCopy = [...lists];
    const currentListIndex = listsCopy.findIndex(list => list.list_id === card.list_id);
    const currentList = listsCopy[currentListIndex];
    currentList.cards.push(card);
    listsCopy[currentListIndex] = currentList;

    setLists(listsCopy);
  }

  async function updateCard(card) {
    await api.put(`/lists/${card.list_id}/cards/${card.card_id}`, card);
  }

  async function deleteCard(card) {
    await api.delete(`/lists/${card.list_id}/cards/${card.card_id}`);

    const listsCopy = [...lists];
    const currentListIndex = listsCopy.findIndex(list => list.list_id === card.list_id);
    const currentList = listsCopy[currentListIndex];

    currentList.cards = currentList.cards.filter(currentCard => currentCard.card_id !== card.card_id);
    listsCopy[currentListIndex] = currentList;

    setLists(listsCopy);
  }

  return (
    <ListsContext.Provider value={{ 
      lists, 
      addCard, 
      addList, 
      updateCard, 
      deleteCard, 
      deleteList, 
      updateList 
    }}>
      {children}
    </ListsContext.Provider>
  )
}

export function useLists() {
  return useContext(ListsContext);
}
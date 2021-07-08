import { useLists } from "../../contexts/listsContext";

import { AddList } from "../AddList";
import { List } from "../List";

import "./styles.scss";

export function Square() {
  const { lists } = useLists();

  return (
    <div id="square-container">
      <div className="lists">
        {lists.map(list => (
          <List
            key={list.position}
            data={list}
          />
        ))}
        <AddList />
      </div>
    </div>
  )
}
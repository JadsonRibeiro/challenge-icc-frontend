import { AiOutlineStar } from "react-icons/ai";
import { BiLock } from "react-icons/bi";

import "./styles.scss";

export function SquareInfo() {
  return (
    <div id="square-info-container">
      <h2>Trello Clone</h2>
      <button>
        <AiOutlineStar />
      </button>
      <button>
        <span>Pessoal</span>
      </button>
      <button>
        <BiLock />
        <span>Particular</span>
      </button>
      <img 
        src="https://github.com/JadsonRibeiro.png" 
        alt="Avatar" 
        className="avatar"
      />
      <button>
        <span>Convidar</span>
      </button>
    </div>
  )
}
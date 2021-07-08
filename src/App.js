import { ListsProvider } from "./contexts/listsContext";

import { Header } from "./components/Header";
import { Square } from "./components/Square";
import { SquareInfo } from "./components/SquareInfo";

import "./styles/global.scss";

function App() {
  return (
    <ListsProvider>
      <Header />
      <SquareInfo />
      <Square />
    </ListsProvider>
  );
}

export default App;

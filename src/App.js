import "./App.css";
import { AppProvider } from "./context";
import Main from "./Main";
import Add from "./Add";
import Delete from "./Delete";
import Edit from "./Edit";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/lisaa" element={<Add />} />
          <Route path="/muokkaa" element={<Edit />} />
          <Route path="/poista" element={<Delete />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;

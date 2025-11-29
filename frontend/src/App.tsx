import { BrowserRouter, Routes, Route } from "react-router-dom";
import Databases from "./pages/Databases";
import HomePage from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<Databases />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

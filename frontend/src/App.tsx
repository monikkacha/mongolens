import { BrowserRouter, Routes, Route } from "react-router-dom";
import Databases from "./pages/Databases";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<>Home Page</>} /> */}
        <Route path="/" element={<Databases />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Databases from "./pages/Databases";
import HomePage from "./pages/Home";
import ConnectionsDashboard from "./pages/ConnectionsDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<Databases />} />
        <Route path="/connections" element={<ConnectionsDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

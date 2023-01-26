import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;

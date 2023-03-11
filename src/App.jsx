import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Interview from "./pages/Interview";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Interview />} />
        <Route
          path="*"
          element={
            <h1 className="text-black flex h-screen items-center justify-center text-3xl font-semibold">
              404 Not Found
            </h1>
          }
        />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;

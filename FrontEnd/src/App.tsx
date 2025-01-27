import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./pages/Form";
import List from "./pages/List";
import Navbar from "./pages/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Navbar />}>
            <Route path="/" element={<Form />}></Route>
            <Route path="/list" element={<List />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

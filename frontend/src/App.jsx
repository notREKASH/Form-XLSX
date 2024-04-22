import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ItemSheet from "./pages/ItemSheet/ItemSheet";
import { Route, Routes } from "react-router-dom";
import AppUsage from "./pages/AppUsage/AppUsage";

function App() {
  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ItemSheet />} />
        <Route path="/app-usage" element={<AppUsage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

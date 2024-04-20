import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
// import ArticleForm from "./pages/ArticleForm/ArticleForm";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ItemSheet from "./pages/ItemSheet/ItemSheet";

function App() {
  return (
    <>
      <Header />
      <ToastContainer />
      <ItemSheet />
      {/* <ArticleForm /> */}
      <Footer />
    </>
  );
}

export default App;

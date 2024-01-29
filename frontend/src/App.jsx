import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import ArticleForm from "./pages/ArticleForm/ArticleForm";

function App() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <ToastContainer />
      <ArticleForm />
      <footer>
        <p>
          All rights reserved &copy;{" "}
          <a
            href="https://www.chezvalerie-videgrenier.fr"
            rel="noreferrer"
            target="_blank">
            Chez Valérie - {currentYear}
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;

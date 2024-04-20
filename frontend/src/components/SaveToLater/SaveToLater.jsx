import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "./SaveToLater.scss";

export default function SaveToLater({ rowData, checkEmptyCells, setIsSaved }) {
  const saveToLater = async () => {
    const emptyCells = checkEmptyCells();
    if (emptyCells.length > 0) {
      return;
    } else if (emptyCells.length === 0 && rowData.length > 0) {
      localStorage.setItem("rowData", JSON.stringify(rowData));
      toast.success("Fiche sauvegardée avec succès");
      setIsSaved(true);
    }
    // Save to later
    if (rowData.length === 0) {
      toast.error("Aucune donnée à sauvegarder"),
        {
          position: "top-center",
          autoClose: 10000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
        };
      return;
    }
  };

  return (
    <>
      <button className="btn btn-primary" onClick={saveToLater}>
        Sauvegarder pour plus tard
      </button>
    </>
  );
}

SaveToLater.propTypes = {
  rowData: PropTypes.array.isRequired,
  checkEmptyCells: PropTypes.func.isRequired,
  setIsSaved: PropTypes.func.isRequired,
};

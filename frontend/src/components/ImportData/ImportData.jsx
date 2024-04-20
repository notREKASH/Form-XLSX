import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "./ImportData.scss";

export default function ImportData({ setRowData, setIsSaved }) {
  const importData = () => {
    const data = JSON.parse(localStorage.getItem("rowData"));
    if (data) {
      setRowData(data);
      toast.success("Fiche importée avec succès");
    }
  };

  return (
    <div className="import-data">
      <h3>Vous avez des données sauvegardées. </h3>
      <div className="import-data__button">
        <button className="btn-primary" onClick={importData}>
          Importer les données
        </button>
        <button
          className="btn-danger"
          onClick={() => {
            localStorage.removeItem("rowData");
            setIsSaved(false);
            toast.error("Données supprimées");
          }}>
          Supprimer les données
        </button>
      </div>
    </div>
  );
}

ImportData.propTypes = {
  setRowData: PropTypes.func.isRequired,
  setIsSaved: PropTypes.func.isRequired,
};

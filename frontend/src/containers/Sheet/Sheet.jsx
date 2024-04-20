import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from "react";
import isCellEditable from "../../helpers/isCellEditable";
import Proptypes from "prop-types";
import DocIco from "../../assets/images/doc-ico.png";
import QuestionIco from "../../assets/images/question-ico.png";
import ImportIco from "../../assets/images/import-ico.png";
import DeleteIco from "../../assets/images/delete-ico.png";
import "./Sheet.scss";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Sheet({
  setData,
  emptyCells,
  handleSaveSheet,
  display,
  setDisplay,
}) {
  // Sheet data
  const [rowData, setRowData] = useState([
    {
      id: "exemple",
      familleProduit: "Vêtement homme",
      designation: "T-shirt nike, blanc et rouge, taille M",
      quantitee: 1,
      prix: 15,
    },
  ]);

  // Column definitions
  const columnDefs = [
    {
      headerName: "Famille de produit",
      field: "familleProduit",
      width: 250,
      sortable: true,
      editable: isCellEditable,
      cellClassRules: {
        "cellule-rouge": (params) => {
          const rowEmpty = emptyCells.find((cell) => cell === params.data.id);
          if (
            (rowEmpty && params.data.familleProduit === "") ||
            params.data.familleProduit === null
          ) {
            return true;
          }
        },
      },
    },
    {
      headerName: "Désignation",
      width: 290,
      field: "designation",
      sortable: true,
      editable: isCellEditable,
      cellClassRules: {
        "cellule-rouge": (params) => {
          const rowEmpty = emptyCells.find((cell) => cell === params.data.id);
          if (
            (rowEmpty && params.data.designation === "") ||
            params.data.designation === null
          ) {
            return true;
          }
        },
      },
    },
    {
      headerName: "Quantité",
      field: "quantitee",
      width: 88,
      sortable: true,
      editable: isCellEditable,
      cellDataType: "number",
      cellClassRules: {
        "cellule-rouge": (params) => {
          const rowEmpty = emptyCells.find((cell) => cell === params.data.id);
          if (rowEmpty && params.data.quantitee === null) {
            return true;
          }
        },
      },
    },
    {
      headerName: "Prix",
      field: "prix",
      width: 84,
      sortable: true,
      editable: isCellEditable,
      valueFormatter: (params) => {
        return `${params.value} €`;
      },
      cellDataType: "number",
      cellClassRules: {
        "cellule-rouge": (params) => {
          const rowEmpty = emptyCells.find((cell) => cell === params.data.id);
          if (rowEmpty && params.data.prix === null) {
            return true;
          }
        },
      },
    },
    {
      headerName: "Supprimer",
      field: "delete",
      width: 100,
      editable: false,
      cellRenderer: (params) => (
        <button
          className="delete-button"
          onClick={() =>
            setRowData(rowData.filter((data) => data !== params.data))
          }>
          🗑️
        </button>
      ),
    },
  ];

  // Function for adding a new row
  const handleAddLine = () => {
    setRowData([
      ...rowData,
      {
        familleProduit: "",
        designation: "",
        quantitee: null,
        prix: null,
        // Id unique pour chaque ligne placer après le prix pour ne pas être pris en compte par le logiciel caisse
        id: Math.random().toString(36).substring(2, 9),
      },
    ]);
  };

  // Function for importing a sheet
  const importSheet = () => {
    const data = JSON.parse(localStorage.getItem("sheetData"));
    if (data) {
      setRowData(data);
      toast.success("Fiche importée avec succès");
    }
  };

  // Function for deleting a sheet
  const deleteSheet = () => {
    localStorage.removeItem("sheetData");
    toast.success("Fiche supprimée");
    setRowData([
      {
        id: "exemple",
        familleProduit: "Vêtement homme",
        designation: "T-shirt nike, blanc et rouge, taille M",
        quantitee: 1,
        prix: 15,
      },
    ]);
    setDisplay(false);
  };

  useEffect(() => {
    setData(rowData);
  }, [rowData, setData]);

  //   Filtered rowData
  const filteredData = rowData.filter((data) => data.id !== "exemple");

  return (
    <div className="sheet">
      <div className="form-container">
        <p className="form-container--mobileInfo">
          <span>📱</span> Sur téléphone, pensez à double-cliquer pour modifier
          une cellule.
        </p>
        <div className="ag-theme-quartz" style={{ height: 500, width: "100%" }}>
          <AgGridReact columnDefs={columnDefs} rowData={rowData}></AgGridReact>
        </div>
        <div className="form-container__btns">
          <div className="form-container__btns__fl">
            <div className="form-container__btns__fl__help">
              <img src={DocIco} alt="Icon document" />
              <Link to="/app-usage">
                <button className="form-container__info--addLine">
                  Comment remplir la fiche ?
                </button>
              </Link>
            </div>
            <div className="form-container__btns__fl__info">
              <p>Nb. d&rsquo;article : {filteredData.length}</p>
              <button
                className="form-container__btns__fl__info--addLine"
                onClick={handleAddLine}>
                Ajouter une ligne
              </button>
            </div>
          </div>
          {display ? (
            <div className="form-container__btns__tl">
              <div className="form-container__btns__tl__import">
                <img src={ImportIco} alt="Icon question" />
                <p>Vous avez une fiche enregistrée</p>
                <button
                  className="form-container__info--addLine"
                  onClick={importSheet}>
                  Importer
                </button>
              </div>
              <div className="form-container__btns__tl__delete">
                <img src={DeleteIco} alt="Icon question" />
                <p>Elle n&rsquo;est plus d&rsquo;actualité ?</p>
                <button
                  className="form-container__info--addLine"
                  onClick={deleteSheet}>
                  Supprimer
                </button>
              </div>
            </div>
          ) : (
            <div className="form-container__btns__sl">
              <img src={QuestionIco} alt="Icon question" />
              <p>
                Manque de temps ? <br className="space" /> Enregistrer pour plus
                tard
              </p>
              <button
                className="form-container__info--addLine"
                onClick={handleSaveSheet}>
                Sauvegarder
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Sheet.propTypes = {
  setData: Proptypes.func.isRequired,
  emptyCells: Proptypes.array.isRequired,
  handleSaveSheet: Proptypes.func.isRequired,
  display: Proptypes.bool.isRequired,
  setDisplay: Proptypes.func.isRequired,
};

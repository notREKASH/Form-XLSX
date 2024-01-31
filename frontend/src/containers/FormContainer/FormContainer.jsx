import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";
import exportToExcelAndSendEmail from "../../components/SendMailXlsx/SendMailXlsx";
import "./FormContainer.scss";
import PersonnalInfoForm from "../../components/PersonnalInfoForm/PersonnalInfoForm";
import isCellEditable from "../../helpers/isCellEditable";

export default function FormContainer() {
  const [rowData, setRowData] = useState([
    {
      id: "exemple",
      familleProduit: "Vêtement homme",
      designation: "T-shirt nike, blanc et rouge, taille M",
      quantitee: "1",
      prix: "15",
    },
  ]);

  const columnDefs = [
    {
      headerName: "Famille de produit",
      field: "familleProduit",
      sortable: true,
      editable: isCellEditable,
    },
    {
      headerName: "Désignation",
      field: "designation",
      sortable: true,
      editable: isCellEditable,
    },
    {
      headerName: "Quantité",
      field: "quantitee",
      sortable: true,
      editable: isCellEditable,
    },
    {
      headerName: "Prix",
      field: "prix",
      sortable: true,
      editable: isCellEditable,
      valueFormatter: (params) => {
        return `${params.value} €`;
      },
    },
    {
      headerName: "Supprimer",
      field: "delete",
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

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [cgv, setCgv] = useState(false);

  const filteredData = rowData.filter((row) => row.id !== "exemple");

  const isDesactivated =
    filteredData.length === 0 || nom === "" || prenom === "" || !cgv;

  const handleChangeCgv = () => {
    setCgv(!cgv);
  };

  // Fonction pour ajouter une ligne
  const handleAddLine = () => {
    setRowData([
      ...rowData,
      {
        familleProduit: "",
        designation: "",
        quantitee: "",
        prix: "",
      },
    ]);
  };

  // Fonction pour envoyer le mail
  const handleSendMail = async () => {
    const result = await exportToExcelAndSendEmail(
      filteredData,
      nom,
      prenom,
      cgv
    );
    if (result) {
      setNom("");
      setPrenom("");
      setCgv(false);
      setRowData([
        {
          id: "exemple",
          familleProduit: "Vêtement homme",
          designation: "T-shirt nike, blanc et rouge, taille M",
          quantitee: "1",
          prix: "15",
        },
      ]);
    }
  };

  for (let i = 0; i < 30; i++) {
    rowData[i] = {
      ...rowData[i],
      familleProduit: `Vêtement ${i}`,
      designation: `T-shirt ${i}`,
      quantitee: "1",
      prix: `${Math.floor(Math.random() * 100) + 1}`,
    };
  }

  return (
    <>
      <div className="ag-theme-quartz" style={{ height: 500, width: "100%" }}>
        <AgGridReact columnDefs={columnDefs} rowData={rowData}></AgGridReact>
      </div>
      <div className="form-container">
        <p className="form-container--mobileInfo">
          <span>📱</span> Sur téléphone, pensez à double-cliquer pour modifier
          une cellule.
        </p>
        <div className="form-container__info">
          <p>Nombre d&rsquo;article total: {filteredData.length}</p>
          <button
            className="form-container__info--addLine"
            onClick={handleAddLine}>
            Ajouter une ligne
          </button>
        </div>
        <PersonnalInfoForm
          nom={nom}
          setNom={setNom}
          prenom={prenom}
          setPrenom={setPrenom}
        />
        <div className="form-container__legal">
          <label htmlFor="cgv">
            <input
              type="checkbox"
              name="cgv"
              id="cgv"
              checked={cgv}
              onChange={handleChangeCgv}
            />
            J&rsquo;atteste sur l&rsquo;honneur que les informations renseignées
            sont exactes et que je suis responsables des erreurs de saisie.
          </label>
        </div>
        <button
          disabled={isDesactivated}
          className={`form-container--export`}
          onClick={handleSendMail}>
          Envoyez votre fiche article
        </button>
      </div>
    </>
  );
}

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from "react";
import exportToExcelAndSendEmail from "../../components/SendMailXlsx/SendMailXlsx";
import "./FormContainer.scss";
import PersonnalInfoForm from "../../components/PersonnalInfoForm/PersonnalInfoForm";
import isCellEditable from "../../helpers/isCellEditable";
import { toast } from "react-toastify";

export default function FormContainer() {
  const [rowData, setRowData] = useState([
    {
      id: "exemple",
      familleProduit: "Vêtement homme",
      designation: "T-shirt nike, blanc et rouge, taille M",
      quantitee: 1,
      prix: 15,
    },
  ]);

  const columnDefs = [
    {
      headerName: "Famille de produit",
      field: "familleProduit",
      width: 250,
      sortable: true,
      editable: isCellEditable,
    },
    {
      headerName: "Désignation",
      width: 290,
      field: "designation",
      sortable: true,
      editable: isCellEditable,
    },
    {
      headerName: "Quantité",
      field: "quantitee",
      width: 88,
      sortable: true,
      editable: isCellEditable,
      cellDataType: "number",
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
        quantitee: null,
        prix: null,
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
          quantitee: 1,
          prix: 15,
        },
      ]);
    }
  };

  useEffect(() => {
    if (filteredData.length === 30) {
      toast.warn(
        "Vous avez déjà ajouté 30 articles, faites attention à ce qu'il passse sur votre stand !",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
        }
      );
    } else if (filteredData.length === 50) {
      toast.warn(
        "Vous avez déjà ajouté 50 articles, faites attention à ce qu'il passse sur votre stand, si vous avez un doute n'hésitez pas à nous contacter !",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
        }
      );
    }
  }, [filteredData.length]);

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

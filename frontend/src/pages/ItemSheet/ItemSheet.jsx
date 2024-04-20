import PersonnalInfoForm from "../../components/PersonnalInfoForm/PersonnalInfoForm";
import Sheet from "../../containers/Sheet/Sheet";
import "./ItemSheet.scss";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdvertSection from "../../containers/AdvertSection/AdvertSection";
import exportToExcelAndSendEmail from "../../components/SendMailXlsx/SendMailXlsx";

export default function ItemSheet() {
  const [emptyCells, setEmptyCells] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+33");
  const [cgv, setCgv] = useState(false);
  const [display, setDisplay] = useState(false);

  // Function for stable data

  const stableData = useCallback((newData) => {
    setRowData(newData);
  }, []);

  //   Filtered rowData
  const filteredData = rowData.filter((data) => data.id !== "exemple");

  //   Check if the user has accepted the terms and conditions
  const isDesactivated =
    filteredData.length === 0 ||
    nom === "" ||
    prenom === "" ||
    email === "" ||
    phone === "" ||
    !cgv;

  // Fonction pour envoyer le mail
  const handleSendMail = async () => {
    setSubmitAttempted(false);
    checkEmptyCells();
    setSubmitAttempted(true);
  };

  const handleChangeCgv = () => {
    setCgv(!cgv);
  };

  // Function for check empty cells
  const checkEmptyCells = () => {
    let tempEmptyCells = [];
    filteredData.forEach((row) => {
      console.log("row", row.familleProduit);
      if (
        row.familleProduit === "" ||
        row.familleProduit === null ||
        row.designation === "" ||
        row.designation === null ||
        row.quantitee === null ||
        row.prix === null
      ) {
        tempEmptyCells.push(row.id);
      }
    });

    setEmptyCells(tempEmptyCells);

    if (tempEmptyCells.length > 0) {
      toast.error("Vous avez des cellules vides, veuillez les remplir.", {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
      return;
    }

    return tempEmptyCells;
  };

  // Function for save sheet
  const handleSaveSheet = () => {
    if (filteredData.length === 0) {
      toast.error("Vous ne pouvez pas enregistrer une fiche article vide.", {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
      return;
    }

    checkEmptyCells();

    if (emptyCells.length === 0) {
      localStorage.setItem("sheetData", JSON.stringify(filteredData));
      toast.success("Votre fiche article a bien été enregistrée.", {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });

      setDisplay(true);
    }
  };

  console.log("emptyCells", emptyCells);

  // Vérifier si toutes les cellules sont remplies et envoyer le mail
  useEffect(() => {
    if (emptyCells.length === 0 && submitAttempted) {
      const result = exportToExcelAndSendEmail(
        filteredData,
        nom,
        prenom,
        email,
        countryCode,
        phone,
        cgv
      );
      if (result.then) {
        result.then((res) => {
          if (res) {
            setNom("");
            setPrenom("");
            setEmail("");
            setPhone("");
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
            setSubmitAttempted(false);
            setEmptyCells([]);
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emptyCells, submitAttempted]);

  // Vérifier si une fiches articles est déjà enregistrée
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("sheetData"));
    if (savedData) {
      setDisplay(true);
    }
  }, []);

  return (
    <section className="item-sheet">
      <PersonnalInfoForm
        nom={nom}
        setNom={setNom}
        prenom={prenom}
        setPrenom={setPrenom}
        countryCode={countryCode}
        setCountryCode={setCountryCode}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
      />
      <Sheet
        setData={stableData}
        emptyCells={emptyCells}
        handleSaveSheet={handleSaveSheet}
        display={display}
        setDisplay={setDisplay}
      />
      <AdvertSection />
      <div className="item-sheet__sendSection">
        <div>
          <input
            type="checkbox"
            id="cgv"
            name="cgv"
            checked={cgv}
            onChange={handleChangeCgv}
          />
          <label htmlFor="cgv">
            J’atteste sur l’honneur que les informations renseignées sont
            exactes et que je suis responsables des erreurs de saisie.
          </label>
        </div>
        <button
          disabled={isDesactivated}
          className={`form-container--export`}
          onClick={handleSendMail}>
          Envoyez votre fiche article
        </button>
      </div>
    </section>
  );
}

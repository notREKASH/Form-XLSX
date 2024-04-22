import PersonnalInfoForm from "../../components/PersonnalInfoForm/PersonnalInfoForm";
import Sheet from "../../containers/Sheet/Sheet";
import "./ItemSheet.scss";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdvertSection from "../../containers/AdvertSection/AdvertSection";
import exportToExcelAndSendEmail from "../../components/SendMailXlsx/SendMailXlsx";
import isDesactivated from "../../utils/isDesactivated";
import checkEmptyCells from "../../utils/checkEmptyCells";

export default function ItemSheet() {
  const [emptyCells, setEmptyCells] = useState([]);
  const [rowData, setRowData] = useState([
    {
      id: "exemple",
      familleProduit: "Vêtement homme",
      designation: "T-shirt nike, blanc et rouge, taille M",
      quantitee: 1,
      prix: 15,
    },
  ]);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // User data
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+33");
  const [cgv, setCgv] = useState(false);

  // Filtered rowData
  const filteredData = rowData.filter((data) => data.id !== "exemple");

  const user = {
    filteredData,
    nom,
    prenom,
    email,
    phone,
    cgv,
  };

  const [display, setDisplay] = useState(false);

  // Function for stable data
  const stableData = useCallback((newData) => {
    setRowData(newData);
  }, []);

  // Function for send mail
  const handleSendMail = async () => {
    setSubmitAttempted(false);
    const emptyCells = checkEmptyCells(filteredData);
    setEmptyCells(emptyCells);
    setSubmitAttempted(true);
  };

  const handleChangeCgv = () => {
    setCgv(!cgv);
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

    const tempEmptyCells = checkEmptyCells(filteredData);
    setEmptyCells(tempEmptyCells);

    if (tempEmptyCells.length === 0) {
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

  // Send mail if no empty cells are found
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

  // Display contact information if data is saved
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("sheetData"));
    if (savedData) {
      setDisplay(true);
    }
  }, []);

  return (
    <>
      <section className="item-sheet">
        <h1>Fiche article - Chez Valérie</h1>
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
          rowData={rowData}
          setRowData={setRowData}
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
            disabled={isDesactivated(user)}
            className={`form-container--export`}
            onClick={handleSendMail}>
            Envoyez votre fiche article
          </button>
          {isDesactivated(user) && (
            <p className="item-sheet__sendSection__error">
              Si le bouton est désactivé, veuillez vérifier que tous les champs
              sont remplis et que vous avez accepté les conditions générales
              d&rsquo;utilisation.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

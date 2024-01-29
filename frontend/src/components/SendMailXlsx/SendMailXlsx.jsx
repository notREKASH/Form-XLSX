import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import axios from "axios";
import base64ToBlob from "../../utils/base64ToBlob";

export default async function exportToExcelAndSendEmail(
  data,
  nom,
  prenom,
  cgv
) {
  // Ajouter 4 lignes vides au début du fichier Excel
  const dataWithFourEmptyRows = [{}, {}, {}, ...data];

  // Créer un nouveau classeur
  const worksheet = XLSX.utils.json_to_sheet(dataWithFourEmptyRows);

  // Créer un nouveau classeur et ajouter la feuille de calcul
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Convertir en chaîne Base64
  const excelBase64 = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "base64",
  });

  // Nom du fichier
  const emailData = {
    fileName: `Fiche_article_${nom}_${prenom}.xlsx`,
  };

  // Créer un Blob avec des données en Base64
  const excelBlob = base64ToBlob(
    excelBase64,
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  // Créer un objet FormData
  const formData = new FormData();
  formData.append("lastName", nom);
  formData.append("firstName", prenom);
  formData.append("cgv", cgv);
  formData.append("attachment", excelBlob, emailData.fileName);

  try {
    const response = await toast.promise(
      axios.post(`http://localhost:5000/sendmail/contact`, formData),
      {
        pending: "Envoi de la fiche article en cours...",
      }
    );

    const message = response.data.message;
    toast.success(message);
    return true;
  } catch (error) {
    const message = error.response.data.message;
    toast.error(message);
  }
}
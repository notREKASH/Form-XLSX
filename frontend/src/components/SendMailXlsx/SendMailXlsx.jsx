import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import axios from "axios";
import base64ToBlob from "../../utils/base64ToBlob";

export default async function exportToExcelAndSendEmail(
  data,
  nom,
  prenom,
  email,
  phone,
  countryCode,
  cgv
) {
  const dataWithFourEmptyRows = [
    {},
    {},
    {},
    ...data,
    {
      familleProduit: "Cellule vide",
      designation: "Pour le logiciel de caisse",
      quantitee: "",
      prix: "25300",
    },
    {
      familleProduit: "Cellule vide",
      designation: "Pour le logiciel de caisse",
      quantitee: "",
      prix: "25300",
    },
    {
      familleProduit: "Cellule vide",
      designation: "Pour le logiciel de caisse",
      quantitee: "",
      prix: "25300",
    },
  ];

  // Créer un nouveau classeur
  const worksheet = XLSX.utils.json_to_sheet(dataWithFourEmptyRows);

  // Créer un nouveau classeur et ajouter la feuille de calcul
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Fiche article");

  // Convertir le classeur en fichier Excel
  const excelBase64 = XLSX.write(workbook, {
    type: "base64",
    bookType: "xlsx",
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

  const formData = new FormData();
  formData.append("lastName", nom);
  formData.append("firstName", prenom);
  formData.append("email", email);
  formData.append("countryCode", countryCode);
  formData.append("phone", phone);
  formData.append("cgv", cgv);
  formData.append("attachment", excelBlob, emailData.fileName);

  try {
    const response = await toast.promise(
      axios.post(`${import.meta.env.VITE_API_URL}/sendmail/contact`, formData),
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
    return false;
  }
}

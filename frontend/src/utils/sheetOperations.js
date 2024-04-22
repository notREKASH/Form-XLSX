export const importSheet = (setRowData, toast) => {
  const data = JSON.parse(localStorage.getItem("sheetData"));
  if (data) {
    setRowData(data);
    toast.success("Fiche importée avec succès");
  }
};

export const deleteSheet = (setRowData, setDisplay, toast) => {
  const confirm = window.confirm(
    "Êtes-vous sûr de vouloir supprimer la fiche ?"
  );

  if (confirm) {
    localStorage.removeItem("sheetData");
    localStorage.removeItem("tempSheetData");
    toast.success("Fiche supprimée avec succès");
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
  }
};

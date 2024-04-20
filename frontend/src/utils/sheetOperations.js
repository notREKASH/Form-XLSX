export const importSheet = (setRowData, toast) => {
  const data = JSON.parse(localStorage.getItem("sheetData"));
  if (data) {
    setRowData(data);
    toast.success("Fiche importée avec succès");
  }
};

export const deleteSheet = (setRowData, setDisplay, toast) => {
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

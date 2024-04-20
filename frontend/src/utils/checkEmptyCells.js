import { toast } from "react-toastify";

const checkEmptyCells = (filteredData) => {
  let tempEmptyCells = [];
  filteredData.forEach((row) => {
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

  if (tempEmptyCells.length > 0) {
    toast.error("Vous avez des cellules vides, veuillez les remplir.", {
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
    });
    return tempEmptyCells;
  }

  return [];
};

export default checkEmptyCells;

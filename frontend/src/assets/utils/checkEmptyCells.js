import { toast } from "react-toastify";

const checkEmptyCells = (filteredRowData) => {
  const tempEmptyCells = [];
  filteredRowData.forEach((data) => {
    if (
      data.familleProduit === "" ||
      data.designation === "" ||
      data.quantitee === null ||
      data.prix === null
    ) {
      tempEmptyCells.push(data.id);
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
    return;
  }

  return tempEmptyCells;
};

export default checkEmptyCells;

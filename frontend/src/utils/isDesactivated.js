const isDesactivated = (user) => {
  return (
    user.filteredData.length === 0 ||
    user.nom === "" ||
    user.prenom === "" ||
    user.email === "" ||
    user.phone === "" ||
    !user.cgv
  );
};

export default isDesactivated;

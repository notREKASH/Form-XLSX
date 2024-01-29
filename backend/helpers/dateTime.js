const dateOfDay = new Date();
const formattedDate = dateOfDay.toLocaleDateString("fr-FR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const formattedTime = dateOfDay.toLocaleTimeString("fr-FR", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

module.exports = {
  formattedDate,
  formattedTime,
};

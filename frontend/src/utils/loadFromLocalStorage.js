export default function loadFromLocalStorage(key) {
  const itemStr = localStorage.getItem(key);

  // Si l'item n'existe pas, retourne null
  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date().getTime();

  if (now > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}

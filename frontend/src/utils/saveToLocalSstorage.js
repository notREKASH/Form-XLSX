export default function saveToLocalStorage(key, data) {
  const now = new Date().getTime();
  const expiry = 5 * 60 * 1000;

  const item = {
    value: data,
    expiry: now + expiry,
  };

  localStorage.setItem(key, JSON.stringify(item));
}

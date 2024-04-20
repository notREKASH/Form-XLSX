import "./Footer.scss";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>
        All rights reserved &copy;{" "}
        <a
          href="https://www.chezvalerie-videgrenier.fr"
          rel="noreferrer"
          target="_blank">
          Chez Valérie - {currentYear}
        </a>
      </p>
    </footer>
  );
}

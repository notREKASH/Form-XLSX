import "./Footer.scss";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        All rights reserved &copy;{" "}
        <a
          href="https://www.chezvalerie-videgrenier.fr"
          rel="noreferrer"
          target="_blank">
          Chez Valérie - {currentYear}
        </a>
        <br />
        Immatriculé au RCS de Besançon sous le numéro 977 456 664
      </p>
    </footer>
  );
}

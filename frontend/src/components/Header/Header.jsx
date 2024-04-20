import Logo from "../../assets/images/logo-chez-valerie.avif";
import BackArrow from "../../assets/images/back-arrow.png";
import "./Header.scss";

export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__container__link">
          <a
            href="https://www.chezvalerie-videgrenier.fr"
            target="_blank"
            rel="noreferrer">
            <img src={BackArrow} alt="Back Arrow" />
          </a>
        </div>
        <div className="header__container__logo">
          <img src={Logo} alt="Logo" />
        </div>
      </div>
    </header>
  );
}

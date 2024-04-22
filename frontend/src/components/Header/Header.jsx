import Logo from "../../assets/images/logo-chez-valerie.webp";
import BackArrow from "../../assets/images/back-arrow.webp";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.scss";

export default function Header() {
  const [appUsage, setAppUsage] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/app-usage") {
      setAppUsage(true);
    } else {
      setAppUsage(false);
    }
  }, [location]);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__container__link">
          {appUsage ? (
            <Link to="/">
              <img src={BackArrow} alt="Retour" />
            </Link>
          ) : (
            <a
              href="https://www.chezvalerie-videgrenier.fr/"
              target="_blank"
              rel="noreferrer">
              <img src={BackArrow} alt="Retour" />
            </a>
          )}
        </div>
        <div className="header__container__logo">
          <img src={Logo} alt="Logo" />
        </div>
      </div>
    </header>
  );
}

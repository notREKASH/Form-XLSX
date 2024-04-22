import PropTypes from "prop-types";
import "./PersonnalInfoForm.scss";

export default function PersonnalInfoForm({
  nom,
  setNom,
  prenom,
  setPrenom,
  countryCode,
  setCountryCode,
  phone,
  setPhone,
  email,
  setEmail,
}) {
  return (
    <form className="form">
      <h2>Informations personnelles</h2>
      <div className="form__input">
        <div className="form__input__name">
          <label htmlFor="nom">Nom :</label>
          <label htmlFor="prenom">Prénom :</label>
          <input
            type="text"
            name="nom"
            id="nom"
            placeholder="Votre nom"
            className="form__input__name--nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            autoComplete="family-name"
          />
          <input
            type="text"
            name="prenom"
            id="prenom"
            placeholder="Votre prénom"
            className="form__input__name--prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            autoComplete="given-name"
          />
        </div>
        <div className="form__input__phone">
          <label htmlFor="country-code">Code pays :</label>
          <label htmlFor="phone">Téléphone :</label>
          <select
            className="form__input__phone--country-code"
            name="country-code"
            id="country-code"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}>
            <option value="+33">+33</option>
            <option value="+41">+41</option>
          </select>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="Numéro de téléphone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="form__input__email">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Votre adresse mail"
            className="form__input__email--email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
      </div>
      <p>
        Pour que nous puissions vous identifier, veuillez renseigner vos{" "}
        <strong>nom</strong> et <strong>prénom</strong> ainsi que votre{" "}
        <strong>adresse mail</strong> et votre <strong>téléphone</strong>.
      </p>
      <p>
        <strong>
          <span>Attention :</span> ces informations doivent être les mêmes que
          celles renseignées lors de votre inscription.
        </strong>
      </p>
    </form>
  );
}

PersonnalInfoForm.propTypes = {
  nom: PropTypes.string.isRequired,
  setNom: PropTypes.func.isRequired,
  prenom: PropTypes.string.isRequired,
  setPrenom: PropTypes.func.isRequired,
  countryCode: PropTypes.string.isRequired,
  setCountryCode: PropTypes.func.isRequired,
  phone: PropTypes.string.isRequired,
  setPhone: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
};

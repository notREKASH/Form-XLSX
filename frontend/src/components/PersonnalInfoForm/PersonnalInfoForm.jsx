import PropTypes from "prop-types";
import "./PersonnalInfoForm.scss";

export default function PersonnalInfoForm({ nom, setNom, prenom, setPrenom }) {
  return (
    <form className="form">
      <h3>Informations personnelles</h3>
      <p>
        Pour que nous puissions vous identifier, veuillez renseigner vos{" "}
        <strong>nom</strong> et <strong>prénom</strong>.
      </p>
      <p>
        <strong>
          <span>Attention :</span> ces informations doivent être les mêmes que
          celles renseignées lors de votre inscription.
        </strong>
      </p>
      <div>
        <label id="nom" htmlFor="nom">
          Nom :
        </label>
        <label id="prenom" htmlFor="prenom">
          Prénom :
        </label>
        <input
          type="text"
          name="nom"
          id="nom"
          placeholder="Votre nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <input
          type="text"
          name="prenom"
          id="prenom"
          placeholder="Votre prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
        />
        <p>
          <span>*</span> les champs marqués d&rsquo;un astérisque sont
          obligatoires
        </p>
      </div>
      <p className="form--sendMail">
        Pour envoyer votre fiche article, cliquez sur le bouton ci-dessous. Si
        il ne s&rsquo;affiche pas, ou qu&rsquo;il est désactivé, vérifiez que
        vous avez bien rempli les champs ci-dessus, et que vous avez ajouté au
        moins une ligne dans le tableau d&rsquo;article.
      </p>
    </form>
  );
}

PersonnalInfoForm.propTypes = {
  nom: PropTypes.string.isRequired,
  setNom: PropTypes.func.isRequired,
  prenom: PropTypes.string.isRequired,
  setPrenom: PropTypes.func.isRequired,
};

import FormContainer from "../../containers/FormContainer/FormContainer";
import "./ArticleForm.scss";
import LogoChezValerie from "../../assets/images/logo-chez-valerie.avif";

export default function ArticleForm() {
  return (
    <>
      <div className="container">
        <img
          src={LogoChezValerie}
          alt="Chez Valérie - Vide grenier permanent"
        />
        <h2>Fiche article</h2>
        <div className="container__explication">
          <h3>
            Ci-dessous, un tableau à remplir en fonction des articles que vous
            comptez vendre sur votre stand.
          </h3>

          <div className="container__explication__tuto">
            <p> Voici un exemple de ce que vous devez remplir :</p>
            <ul className="container__explication__tuto--liste">
              <li>
                <strong>1. Famille de Produit :</strong> Renseignez la catégorie
                de votre article, exemple CD = Audio ou T-Shirt = Vêtement
                adulte.
              </li>
              <li>
                <strong>2. Désignation :</strong> La description doit contenir
                les informations de votre produit, exemple T-Shirt Bleu & Blanc
                Taille L (Vous pouvez aussi ajouter l’état et s&rsquo;il manque
                quelque chose).
              </li>
              <li>
                <strong>3. Quantité :</strong> Pour tout ce qui se vend par 2,
                exemple les chaussures, mettez 1.
              </li>
              <li>
                <strong>4. Prix :</strong> Choisissez votre prix, soyez
                cohérent. Les prix renseigner seront les prix sur vos
                étiquettes.
              </li>
            </ul>
          </div>

          <div className="container__explication__legal">
            <p>
              <strong>Attention :</strong> Prenez le temps de bien remplir le
              formulaire, car{" "}
              <span>
                vous êtes entièrement responsables des informations que vous
                nous fournissez
              </span>
              . Si, par exemple, vous vous trompez sur le prix et que vous vous
              rendez compte de votre erreur le jour de votre départ, nous ne
              pourrons pas vous rembourser la différence.
              <br />
              <br />
              Sachez que nous gardons toutes les fiches articles que vous nous
              envoyez, et que nous pouvons vous les fournir si vous en avez
              besoin ou en cas de litige.
            </p>
          </div>
          <h4>
            Pour la première ligne du tableau, si vous le souhaitez vous pouvez
            la supprimer en cliquant sur la corbeille “{" "}
            <span style={{ fontStyle: "normal" }}>🗑️</span>“ dans la colonne
            “Supprimer“, sinon laissez la elle ne sera pas prise en compte.
          </h4>
        </div>
        <FormContainer />
      </div>
    </>
  );
}

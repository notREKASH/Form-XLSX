import "./AppUsage.scss";

const explication = [
  {
    id: 1,
    title: "Famille de Produit :",
    text: "Renseignez la catégorie de votre article, exemple CD = Audio ou T-Shirt Homme = Vêtement homme.",
  },
  {
    id: 2,
    title: "Désignation :",
    text: "La description doit contenir les informations de votre produit, exemple T-Shirt Bleu & Blanc Taille L (Vous pouvez aussi ajouter l’état et s&rsquo;il manque quelque chose).",
  },
  {
    id: 3,
    title: "Quantité :",
    text: "Pour tout ce qui se vend par 2, exemple les chaussures, mettez 1.",
  },
  {
    id: 4,
    title: "Prix :",
    text: "Choisissez votre prix, soyez cohérent. Les prix renseigner seront les prix sur vos étiquettes.",
  },
];

export default function AppUsage() {
  return (
    <>
      <div className="app-usage">
        <h1>Comment utiliser l&rsquo;application ?</h1>
        <p>
          Pour remplir la fiche article, commencez par renseigner les
          informations demandées. Vous pouvez ajouter une ligne si besoin.
        </p>
        <div className="app-usage__explication">
          <h2>Voici un exemple de ce que vous devez remplir :</h2>
          <ul className="app-usage__explication--liste">
            {explication.map((item) => (
              <li key={item.id}>
                <strong>{item.title}. </strong>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        <p>
          Une fois la fiche article rempli, vous cliquez sur envoyer ou la
          sauvegarder pour plus tard.
        </p>
        <h3>
          Pour la première ligne du tableau, si vous le souhaitez vous pouvez la
          supprimer en cliquant sur la corbeille “{" "}
          <span style={{ fontStyle: "normal" }}>🗑️</span>“ dans la colonne
          “Supprimer“, sinon laissez la elle ne sera pas prise en compte.
        </h3>
      </div>
    </>
  );
}

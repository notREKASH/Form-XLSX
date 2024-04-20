import AdvertImg from "../../assets/images/avertissement final.png";
import "./AdvertSection.scss";

export default function AdvertSection() {
  return (
    <section className="advert-section">
      <div className="advert-section--container">
        <img src={AdvertImg} alt="Avertissements et Responsabilités" />
        <p>
          Prenez le temps de bien remplir le formulaire,{" "}
          <span>
            car vous êtes entièrement responsables des informations que vous
            nous fournissez
          </span>
          . Si, par exemple, vous vous trompez sur le prix et que vous vous
          rendez compte de votre erreur le jour de votre départ, nous ne
          pourrons pas vous rembourser la différence.
          <br />
          <br />
          Sachez que nous gardons toutes les fiches articles que vous nous
          envoyez, et que nous pouvons vous les fournir si vous en avez besoin
          ou en cas de litige.
        </p>
      </div>
    </section>
  );
}

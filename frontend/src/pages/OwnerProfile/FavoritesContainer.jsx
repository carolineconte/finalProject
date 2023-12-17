/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { uploads } from "../../utils/config";

export const FavoritesContainer = ({ styles, favorites, setRemoveFavorite, handleRemoveFavorite }) => {
 
  return (
    <div className={styles.ownerFavoritesContainer}>
      {favorites && (
        favorites.map(vet => (
          <section className={styles.petProfileLink} key={vet.vetID}>
            <Link to={`/professional/profile/${vet.vetID}`}>
              <img src={`${uploads}/prof/${vet.vetPhoto}`} alt="" />
              <p className="contorno">{vet.vetName}</p>
            </Link>
           <button className={styles.removeFavorite}
           onClick={() => setRemoveFavorite(vet.vetID)}>Remove from favorites</button>
          </section>
        )))
      }

   </div>
  )
}

/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { uploads } from "../../utils/config";

export const PetsContainer = ({styles, pets}) => {
  return (
    <div className={styles.ownerPetsContainer}>
        {pets && (
              pets.map(pet => (
                <section className={styles.petProfileLink} key={pet._id}>
                  <Link to={`/petprofile/${pet._id}`}>
                    <img src={`${uploads}/users/${pet.image?.filename}`} alt="" />
                    <p className="contorno">{pet.name}</p>
                  </Link>
                </section>
              )))
            }

            <section className={styles.petProfileLink}>
              <Link to={`/newpet`}>
                <img src="/pets.png" alt="" />
                <p id={styles.add} className={"contorno"}> New Pet</p>
              </Link>
            </section>
    </div>
  )
}

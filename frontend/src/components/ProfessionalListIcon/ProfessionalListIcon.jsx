/* eslint-disable react/prop-types */
import styles from './ProfessionalListIcon.module.css'
import { uploads } from "../../utils/config";
import { Link } from 'react-router-dom';

export const ProfessionalListIcon = ({ professional }) => {

  const {
    _id, name, image, specialization, addressStreet, addressN, addressCity} = professional

  return (
    <Link to={`/professional/profile/${_id}`} className={styles.professionalCard}>
      <img src={`${uploads}/prof/${image?.filename}`} alt="" />
      <div>
        <h3>Dr. {name}</h3>
        <p>{specialization}</p>
        <p>Street: {addressStreet}, {addressN} - {addressCity}</p>
        <p className={styles.hiddenText}>See more...</p>
      </div>
    </Link>
  )
}

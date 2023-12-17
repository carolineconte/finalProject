import styles from './VetList.module.css'
import { useEffect, useState } from 'react'
import { ProfessionalListIcon } from '../../components/ProfessionalListIcon/ProfessionalListIcon';

export const VetList = () => {

  const [professionals, setProfessionals] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/professional/list`);

        if (response.ok) {
          const data = await response.json();
          setProfessionals(data);
        } else {
          console.error('Error: HTTP request failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const [filterType, setFilterType] = useState('')
  const [filterValue, setFilterValue] = useState('')

  //Filter
  const filteredProfessionals = professionals.filter(professional => {

    if (!filterType || !filterValue) {
      return true;
    }

    if (filterType === 'name' && professional.name.toLowerCase().includes(filterValue.toLowerCase())) {
      return true;
    } else if (filterType === 'city' && professional.addressCity.toLowerCase().includes(filterValue.toLowerCase())) {
      return true;
    } else if (filterType === 'specialization' && professional.specialization.toLowerCase().includes(filterValue.toLowerCase())) {
      return true;
    }
    return false;
  });

  return (
    <div className={styles.ListContainer}>
      <div className={styles.ListFilter}>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="">Filter by:</option>
          <option value="name">Name</option>
          <option value="city">City</option>
          <option value="specialization">Specialization</option>
        </select>
        <input placeholder='First select the filter type'
        value={filterValue} onChange={(e) => setFilterValue(e.target.value)} type="text" />
      </div>
      <div className={styles.VetListContainer}>
        {
          filteredProfessionals.map(professional => <ProfessionalListIcon key={professional._id} professional={professional} />)
        }
      </div>
    </div>
  )
}

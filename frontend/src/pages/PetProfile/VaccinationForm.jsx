/* eslint-disable react/prop-types */

export const VaccinationForm = ({ styles, vaccine, setVaccine, handleUpdate, 
  vaccines,setVaccineToDelete, loadingUpdate}) => {
    const handleDeleteVaccine = (id) => {
      setVaccineToDelete(id);
  
    };
  return (
    <>
    <form onSubmit={handleUpdate} className={styles.vaccinesForm}>
    <input required placeholder="vaccine Ident/batch: "
      value={vaccine.ident} onChange={(e) => setVaccine({ ...vaccine, ident: e.target.value })} type="text" />

    <input required placeholder="vaccine for?"
      value={vaccine.name} onChange={(e) => setVaccine({ ...vaccine, name: e.target.value })} type="text" />

    <input required value={vaccine.date} onChange={(e) => setVaccine({ ...vaccine, date: e.target.value })}
      type="date" />
    <input value={vaccine.nextDate} onChange={(e) => setVaccine({ ...vaccine, nextDate: e.target.value })}
      type="date" />
      {
        loadingUpdate ? ( <input disabled type="submit" value='wait' />) : ( <input className={styles.vaccineInpt} type="submit" value='send' />)
      }
   
  </form>
  <section>
  {vaccines && (vaccines.map((vaccine, i) => (
    <div key={i} className={styles.controlRecords}>
      <p><span>Type:</span> {vaccine.name}</p>
      <p><span>Ident:</span> {vaccine.ident}</p>
      <p>date: {vaccine.date}</p>
      <button onClick={() => handleDeleteVaccine(vaccine.id)}>Delete</button>
    </div>
  )
  ))
  }
</section>
</>
  )
}

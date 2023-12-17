/* eslint-disable react/prop-types */

export const DewormingForm = ({ name, styles, setDewormingToDelete, dewormings, deworming, setDeworming, handleUpdate, loadingUpdate }) => {
  const handleDeleteDew = (id) => {
    setDewormingToDelete(id);

  };
  return (
    <>
      <form onSubmit={handleUpdate} className={styles.vaccinesForm}>
        <input placeholder="Name of medicine / dose of medicine " value={deworming.name}
          onChange={(e) => setDeworming({ ...deworming, name: e.target.value })} type="text" />
        <input placeholder="Pet's weight" value={deworming.weight}
          onChange={(e) => setDeworming({ ...deworming, weight: e.target.value })} type="text" />
        <input value={deworming.date} onChange={(e) => setDeworming({ ...deworming, date: e.target.value })}
          type="date" />
        <input value={deworming.nextDate} onChange={(e) => setDeworming({ ...deworming, nextDate: e.target.value })}
          type="date" />
        {
          loadingUpdate ? (<input disabled type="submit" value='wait' />) : (<input className={styles.vaccineInpt} type="submit" value='send' />)
        }
      </form>
      <section>
        {dewormings && (dewormings.map((deworming, i) =>
          <div key={i} className={styles.controlRecords}>
            <p>Name/dose: {deworming.name}</p>
            <p>{name}&rsquo;s weight: {deworming.weight} Kgs</p>
            <p>date: {deworming.date}</p>
            <button onClick={() => handleDeleteDew(deworming.id)}>Delete</button>
          </div>
        ))}
      </section>
    </>
  )
}

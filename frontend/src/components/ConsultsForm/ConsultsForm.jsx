/* eslint-disable react/prop-types */
import { useState } from "react";

export const ConsultsForm = ({ styles, consultations, handleUpdate, consultation, setConsultation, setConsultationToDelete }) => {
  const handleDeleteConsultation = (id) => {
    setConsultationToDelete(id);
  };

  const [filterType, setFilterType] = useState('')
  const [filterValue, setFilterValue] = useState('')

  //Filter
  const filteredConsults = consultations.filter(consult => {

    if (!filterType || !filterValue) {
      return true;
    }

    if (filterType === 'control for' && consult.control.toLowerCase().includes(filterValue.toLowerCase())) {
      return true;
    } else if (filterType === 'date' && consult.date.toLowerCase().includes(filterValue.toLowerCase())) {
      return true;
    }
    return false;
  });

  return (
    <>

      <form onSubmit={handleUpdate}>
        <label>Is it control of any chronic disease?
          <input placeholder="enter the name of the disease" type="text"
            value={consultation.control} onChange={(e) => setConsultation({ ...consultation, control: e.target.value })}
          />
        </label>

        <textarea placeholder="Describe the symptoms" rows={2}
          value={consultation.sintoms} onChange={(e) => setConsultation({ ...consultation, sintoms: e.target.value })}
        />
        <textarea placeholder="exams and results:" rows={2}
          value={consultation.exams} onChange={(e) => setConsultation({ ...consultation, exams: e.target.value })}
        />
        <textarea placeholder="assessment:" rows={2}
          value={consultation.assessment} onChange={(e) => setConsultation({ ...consultation, assessment: e.target.value })}
        />
        <textarea placeholder="Describe the prescribed treatment:" rows={2}
          value={consultation.treatment} onChange={(e) => setConsultation({ ...consultation, treatment: e.target.value })}
        />
        <div className={styles.inputsConsult}>
          <input placeholder="Veterinarian:" type="text"
            value={consultation.vet} onChange={(e) => setConsultation({ ...consultation, vet: e.target.value })}
          />
          <input type="date"
            value={consultation.date} onChange={(e) => setConsultation({ ...consultation, date: e.target.value })}
          />
        </div>
        <input type="submit" value="Add" />
      </form>
      <div className={styles.ListFilter}>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="">Filter by:</option>
          <option value="control for">Control for:</option>
          <option value="date">Date:</option>
        </select>
        <input placeholder='First select the filter type'
          value={filterValue} onChange={(e) => setFilterValue(e.target.value)} type="text" />
      </div>

      <section>
        {consultations && (filteredConsults.map((consult, i) =>
          <div key={i} className={styles.consultsRecordsCards}>
            <div className={styles.consultControl}>
              <p><span>Date:</span> {consult.date}</p>
              {consult.control && (<h3><span>Control for: </span>{consult.control}</h3>)}

            </div>
            {consult.sintoms && (<p><span>Sintoms: </span>{consult.sintoms}</p>)}
            {consult.exams && (<p><span>Exams and results: </span>{consult.exams}</p>)}
            <p><span>Veterinarian&rsquo;s assessment: </span>{consult.assessment}</p>
            {consult.treatment && (<p><span>Prescribed treatment: </span>{consult.treatment}</p>)}

            <button onClick={() => handleDeleteConsultation(consult.id)}>Delete</button>
          </div>
        ))}

      </section>
    </>
  )
}

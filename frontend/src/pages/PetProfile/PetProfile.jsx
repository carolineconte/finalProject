import styles from "./PetProfile.module.css";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DewormingForm } from "./DewormingForm";
import { VaccinationForm } from "./VaccinationForm";
import { PetProfileInfo } from "./PetProfileInfo";
import { ConsultsForm } from "./ConsultsForm";

export const PetProfile = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const { id } = useParams()

  const [pet, setPet] = useState({})
  const { name, weight, dewormings, consultations, vaccines } = pet

  const [isLoading, setIsLoading] = useState(true)
  const [loadingUpdate, setLoadingUpdate] = useState(false)

  const [newWeight, setNewWeight] = useState(weight)
  const [uppWeight, setUppWeight] = useState(false)

  const [vaccineToDelete, setVaccineToDelete] = useState('')
  const [dewormingToDelete, setDewormingToDelete] = useState('')
  const [consultationToDelete, setConsultationToDelete] = useState('')

  const [vaccineDone, setVaccineDone] = useState('')


  function gerarIdUnico() {
    return `id_${Math.random().toString(36).substr(2, 9)}`;
  }

  const [vaccine, setNewVaccine] = useState({
    name: '',
    ident: '',
    date: '',
    nextDate: '',
    id: gerarIdUnico(),
  })
  const [deworming, setDeworming] = useState({
    name: '',
    weight: '',
    date: '',
    nextDate: '',
    id: gerarIdUnico(),
  })
  const [consultation, setConsultation] = useState({
    sintoms: '',
    control: '',
    vet: '',
    date: '',
    exams: '',
    assessment: '',
    treatment: '',
    id: gerarIdUnico(),
  })

  //CARREGAR DADOS PERFIL
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/petprofile/${id}`);
        if (res.ok) {
          const dadosJson = await res.json();
          setPet(dadosJson);
          setIsLoading(false)
        } else {
          console.error('Erro ao buscar dados:', res.status);
        }
      } catch (erro) {
        console.error('Erro na solicitação:', erro);
      }
    };
    fetchData();
  }, [id, setPet]);

  //INFOS UPDATES
  const handleUpdate = async (e) => {
    if (e) {
      e.preventDefault()
    }

    setLoadingUpdate(true)

    const UpdateInfo = {};

    if (uppWeight) { UpdateInfo.weight = newWeight }
    if (vaccine.name) { UpdateInfo.vaccine = vaccine }
    if (deworming.name) { UpdateInfo.deworming = deworming }
    if (consultation.control || consultation.sintoms) { UpdateInfo.consultation = consultation }
    if (vaccineToDelete) { UpdateInfo.vaccineToDelete = vaccineToDelete }
    if (dewormingToDelete) { UpdateInfo.dewormingToDelete = dewormingToDelete }
    if (consultationToDelete) { UpdateInfo.consultationToDelete = consultationToDelete }
    if (vaccineDone) (UpdateInfo.vaccineDone = vaccineDone)


    try {
      const response = await fetch(`http://localhost:3000/petprofile/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(UpdateInfo),
      });

      if (response.ok) {
        const data = await response.json();

        setPet(data)

        setUppWeight(false)
        setLoadingUpdate(false)
        setVaccineToDelete('')
        setDewormingToDelete('')
        setVaccineDone('')
        setNewVaccine({
          name: '',
          ident: '',
          date: '',
          nextDate: '',
          id: gerarIdUnico(),
        });
        setDeworming({
          name: '',
          weight: '',
          date: '',
          nextDate: '',
          id: gerarIdUnico(),
        });
        setConsultation({
          sintoms: '',
          control: '',
          vet: '',
          date: '',
          exams: '',
          assessment: '',
          treatment: '',
          id: gerarIdUnico(),

        })

      } else {
        console.error('Erro:', response.statusText);
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  }

  //DELETE ITENS
  useEffect(() => {
    handleUpdate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vaccineDone && vaccine, consultationToDelete, dewormingToDelete, vaccineToDelete])

  const handleDoneVaccine = (id, name, date) => {
    setVaccineDone(id);
    setNewVaccine({
      name: name,
      date: date,
      nextDate: '',
      id: gerarIdUnico(),
    })
  };

  return (
    <div className={styles.ProfileContainer}>
      {isLoading ? (<p>Carregando Pagina..</p>) : (
        <>
          <h1>{name}</h1>

          <PetProfileInfo styles={styles} pet={pet} handleUpdate={handleUpdate}
            uppWeight={uppWeight} setUppWeight={setUppWeight} newWeight={newWeight} setNewWeight={setNewWeight} />

          <div className={styles.stickyNotes}>
            <h2>Upcoming vaccines:</h2>
            <div className={styles.stickyNotesList}>
              {
                vaccines.map((vaccine) => (vaccine.nextDate && (
                  <div className={styles.stickyNotesNextDate} key={vaccine.id}>
                    <p>{vaccine.name}: {vaccine.nextDate}</p>
                    <button onClick={() => handleDoneVaccine(vaccine.id, vaccine.name, vaccine.nextDate)}>Done</button>
                  </div>
                )))
              }
            </div>
          </div>

          <section className={styles.sectionControls}>
            <h2>Vaccination Record:</h2>
            <VaccinationForm styles={styles} loadingUpdate={loadingUpdate} vaccine={vaccine} handleUpdate={handleUpdate}
              setVaccineToDelete={setVaccineToDelete} vaccines={vaccines} setVaccine={setNewVaccine} />
          </section>

          <section className={styles.sectionControls}>
            <h2>Deworming Control:</h2>
            <DewormingForm styles={styles} loadingUpdate={loadingUpdate} dewormings={dewormings}
              deworming={deworming} setDeworming={setDeworming} name={name}
              setDewormingToDelete={setDewormingToDelete} handleUpdate={handleUpdate} />
          </section>

          <section className={styles.sectionControlsConsults}>
            <h2>Veterinary consultation records:</h2>
            <ConsultsForm styles={styles} consultations={consultations} handleUpdate={handleUpdate} consultation={consultation}
              setConsultation={setConsultation} setConsultationToDelete={setConsultationToDelete} />
          </section>
        </>
      )}
    </div>
  )
}

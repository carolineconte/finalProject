import styles from "./OwnerProfile.module.css";
//HOOKS
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//COMPONENTS
import { AccountContainer } from "./AccountContainer";
import { PetsContainer } from "./PetsContainer";
import { FavoritesContainer } from "./FavoritesContainer";
import { RemindersContainer } from "./RemindersContainer";

export const OwnerProfile = () => {
  const { id } = useParams()
  const user = JSON.parse(localStorage.getItem('user'))

  const [account, setAccount] = useState('')
  const [profile, setProfile] = useState({})
  const { name, image, favorites, reminders } = profile
  const [pets, setPets] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  const [newReminder, setNewReminder] = useState('')
  const [deleteReminder, setDeleteReminder] = useState('')
  const [removeFavorite, setRemoveFavorite] = useState('')
  const [previewImage, setPreviewImage] = useState('');


  const fetchData = async (url, onSuccess) => {
    try {
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        onSuccess(data);
        setIsLoading(false);
      } else {
        console.error(`Erro ao buscar dados: ${response.status}`);
      }
    } catch (error) {
      console.error('Erro na solicitação:', error);
    }
  };

  //PROFILE INFOS
  useEffect(() => {
    const profileUrl = `http://localhost:3000/owner/profile/${id}`;
    fetchData(profileUrl, setProfile);
  }, [id]);
  //PETS INFOS
  useEffect(() => {
    const petsUrl = `http://localhost:3000/owner/profile/${id}/mypets`;
    fetchData(petsUrl, setPets);
  }, [id]);
  //USER INFOS
  useEffect(() => {
    const userURL = `http://localhost:3000/api/users/${id}`;
    fetchData(userURL, setAccount);
  }, [id]);


  const handleProfileUpdates = async (e) => {
    e?.preventDefault();

    const infoUpdate = {
      ownerID: id,
    };

    if (newReminder) infoUpdate.newReminder = newReminder;
    if (deleteReminder) infoUpdate.deleteReminder = deleteReminder;
    if (removeFavorite) infoUpdate.removeFavorite = removeFavorite;

    if (previewImage) infoUpdate.image = previewImage;

    const formData = new FormData();
    for (const key in infoUpdate) {
      formData.append(key, infoUpdate[key]);
    }

    try {
      const res = await fetch('http://localhost:3000/owner/profile/update', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      if (res.ok) {
        console.log('Profile updated successfully');
        const dadosJson = await res.json();
        setProfile(dadosJson);
        setNewReminder('');
        setDeleteReminder('');
        setRemoveFavorite('');
        setPreviewImage('')
      } else {
        const error = await res.json();
        throw new Error(`Request error: ${error.error}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleDeleteReminder =  (e, name) => {
     setDeleteReminder(name)

  }

  const handleRemoveFavorite = (name) => {
    setDeleteReminder(name)
  }

  useEffect(() => {
    handleProfileUpdates()
  }, [deleteReminder, removeFavorite])

  return (
    <>
      {isLoading ? (<p>Carregando pagina...</p>) :
        (<div className={styles.ownerProfileContainer}>

          <div className='accountContainer'>
            <AccountContainer setPreviewImage={setPreviewImage} previewImage={previewImage}
              handleProfileUpdates={handleProfileUpdates}
              styles={styles}
              name={name} id={id} account={account} image={image} />
          </div>

          <div className={styles.stickyNotes}>
            <RemindersContainer styles={styles} newReminder={newReminder} setNewReminder={setNewReminder}
              handleProfileUpdates={handleProfileUpdates} reminders={reminders} handleDeleteReminder={handleDeleteReminder} />
          </div>


          <div className={styles.containerMargin}>
            <h2>Your Pets</h2>
            <PetsContainer styles={styles} pets={pets} />
          </div>


          <div className={styles.containerMargin}>
            <h2>Your favorite professionals</h2>
            <FavoritesContainer styles={styles} favorites={favorites}
              setRemoveFavorite={setRemoveFavorite} handleRemoveFavorite={handleRemoveFavorite} />
          </div>

        </div>
        )
      }
    </>
  )
}

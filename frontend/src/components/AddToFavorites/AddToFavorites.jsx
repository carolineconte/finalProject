import { useState } from 'react'
import style from './AddToFavorites.module.css'

export const AddToFavorites = ({ idVet, idOwner }) => {
  const user = JSON.parse(localStorage.getItem('user'))

  const vetID = idVet
  const ownerID = idOwner

  const [alreadyInFavorites, setAlreadyInFavorites] = useState('')

  console.log(ownerID, vetID)


  const handleAddToFavorites = async (e) => {
    e.preventDefault();

    const infoUpdate = {
      ownerID,
      vetID,
    };

    try {
      const res = await fetch('http://localhost:3000/owner/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(infoUpdate),
      });

      if (res.ok) {
        console.log('Profile updated successfully');
        setAlreadyInFavorites('Added successfully')
      } else {
        return res.json().then(error => {
          setAlreadyInFavorites(`${error.error}`)
          throw new Error(`Erro na requisição: ${error.error}`);
        });

      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <>
    {
      alreadyInFavorites ?(<button className={style.addFavoriteButton}>{alreadyInFavorites}</button>) : (<button className={style.addFavoriteButton} onClick={handleAddToFavorites}>add to your favorites</button>)
    }
    </>
  )
}

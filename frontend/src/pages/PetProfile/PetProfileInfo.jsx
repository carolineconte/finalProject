/* eslint-disable react/prop-types */
import { uploads } from "../../utils/config";
import { useParams, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { Message } from "../../components/msg/Message";

export const PetProfileInfo = ({ styles, pet, uppWeight, setUppWeight, handleUpdate, newWeight, setNewWeight }) => {

  const { image, age, owner, color, gender, microchip, birth, breed, weight } = pet
  const navigate = useNavigate()
  const { id } = useParams()
  const user = JSON.parse(localStorage.getItem('user'))
  const [previewImage, setPreviewImage] = useState('');
  const [errorImage, setErrorImage] = useState('')

  //DELETE PROFILE
  const handleDelete = async (e) => {
    e.preventDefault();
    try {

      const fetchDelete = await fetch(`http://localhost:3000/petprofile/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        }
      })

      if (fetchDelete.ok) {
        navigate(`/owner/profile/${owner}`)

      } else {
        console.error('Erro:', fetchDelete.statusText);
      }
    } catch (error) {
      console.error('Erro:', error);
    }

  }
  console.log(id)

  //Image
  const handleFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Verificar se a extensão do arquivo é JPG ou PNG
      const allowedExtensions = ['jpg', 'png', 'JPG', 'PNG'];
      const fileExtension = file.name.split('.').pop().toLowerCase();

      if (allowedExtensions.includes(fileExtension)) {
        setPreviewImage(file);
        // Limpar mensagem de erro se houver uma
        setErrorImage('');
      } else {
        // Caso contrário, mostrar uma mensagem de erro
        setErrorImage('Only JPG and PNG files are allowed.');

        // Limpar o campo de entrada
        inputRef.current.value = '';
      }
    }

  };
  const handleNewImage = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append('id', id);
    formData.append('image', previewImage);

    try {
      const res = await fetch(`http://localhost:3000/petprofile/updateImage`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      if (res.ok) {
        console.log('Profile updated successfully');
        const dadosJson = await res.json();
        console.log(dadosJson)
      } else {
        const error = await res.json();
        throw new Error(`Request error: ${error.error}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  const inputRef = useRef(null)
  const handleButtonClick = (e) => {
    e.preventDefault()
    // Simular o clique no campo de entrada de arquivo
    inputRef.current.click();
  };
  return (
    <div className={styles.profile}>

      <div className={styles.ImgContainer}>
        {
          ((previewImage) ?
            (<img src={URL.createObjectURL(previewImage)} />
            ) : (
              <img src={`${uploads}/users/${image?.filename}`} />
            ))
        }
        <div className={styles.ChangeProfileImgBtn}>
          <button onClick={handleButtonClick}>Select a new image</button>
          <input onChange={handleFile} ref={inputRef} style={{ display: 'none' }} type="file" />
          {errorImage && <Message msg={errorImage} type="error" />}
          {(!errorImage && previewImage) && (<input type="submit" onClick={handleNewImage} value='Save' />)}
        </div>
      </div>

      <div className={styles.profileInfo}>
        <p><span>Microchip number: </span>{microchip}</p>
        <p><span>Age: </span>{age}</p>
        <p><span>Color: </span>{color}</p>
        <p><span>Gender: </span>{gender}</p>
        <p><span>Birth: </span>{birth}</p>
        <p><span>Breed: </span>{breed}</p>
        {
          uppWeight ? (
            <>
              <p className={styles.pWithEdit}><span>Weight:</span>
                <input type="text" value={newWeight} onChange={(e) => setNewWeight(e.target.value)} />
                <button onClick={handleUpdate}>Save</button>
              </p>
            </>
          ) : (
            <div>
              <p className={styles.pWithEdit}><span>Weight:</span> {newWeight || weight} kgs
                <button onClick={() => setUppWeight(true)}>Edit</button>
              </p>
            </div>)
        }
        <button onClick={handleDelete} className='btn-Profile red'>Delete this Profile</button>

      </div>
    </div>
  )
}

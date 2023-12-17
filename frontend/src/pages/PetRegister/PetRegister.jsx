/* eslint-disable no-unused-vars */
import styles from "./PetRegister.module.css";
//COMPONENTS
import { TextInput } from "../../components/TextInput/TextInput"
import { Message } from "../../components/msg/Message";

import { useState, useRef, useEffect } from "react"

import { useNavigate } from "react-router-dom";

export const PetRegister = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  const [image, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [errorImage, setErrorImage] = useState('')

  const [name, setName] = useState('');
  const [age, setAge] = useState('')
  const [color, setColor] = useState('')
  const [gender, setGender] = useState('')
  const [microchip, setMicrochip] = useState('')
  const [birth, setBirth] = useState('')
  const [weight, setWeight] = useState('')
  const [breed, setBreed] = useState('')

  const inputRef = useRef(null)

  const handleButtonClick = (e) => {
    e.preventDefault()
    // Simular o clique no campo de entrada de arquivo
    inputRef.current.click();
  };

  //Imagem
  const handleFile = (e) => {
    // image preview
    const image = e.target.files[0];

    const allowedExtensions = ['jpg', 'png', 'JPG', 'PNG'];
    const fileExtension = image.name.split('.').pop().toLowerCase();

    if (allowedExtensions.includes(fileExtension)) {
       setPreviewImage(image);
       setImage(image);
      setErrorImage('');
    } else {
      setErrorImage('Only JPG and PNG files are allowed.');
      inputRef.current.value = '';
    }

  };

  const [date, setdate] = useState('')
  console.log(date.split(0, 4))

  //SET AGE
  useEffect(() => {
    const birthDate = new Date(birth);
    const today = new Date();

    const diferencaAnos = today.getFullYear() - birthDate.getFullYear();
    const diferencaMeses = today.getMonth() - birthDate.getMonth();

    if (!birth) {
      setAge('Forneca data de nascimento')
    } else if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
      setAge(`${diferencaAnos - 1} years`);
    } else if (diferencaAnos < 1) {
      setAge(`${diferencaMeses} months`)
    } else {
      setAge(`${diferencaAnos} years`);
    }
  }, [birth])


  const handleSubmit = (e) => {
    e.preventDefault()

    const newPet = {
      owner: user._id,
      name,
      image,
      age,
      color,
      gender,
      microchip,
      birth,
      breed,
      weight
    }

    const formData = new FormData();
    for (const key in newPet) {
      formData.append(key, newPet[key]);
    }

    fetch('http://localhost:3000/owner/newpet', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        navigate(`/owner/profile/${user._id}`)
      }
      )
      .catch(error => console.error('Erro:', error));
  }


  return (
    <section className={styles.form}>
      <form onSubmit={handleSubmit}>

        <div className={styles.inputImg}>
          {
            ((previewImage) ?
              (<img className={styles.profileImg}
                src={URL.createObjectURL(previewImage)} />
              )
              : (<img className={styles.profileImg} src="/add-profile-pic.jpg" alt="add profile picture" />)
            )
          }
          <button className={styles.fileBtn} onClick={handleButtonClick}>Add a new Picture</button>
          <input ref={inputRef} style={{ display: 'none' }} type="file" onChange={handleFile} />
          {errorImage && <Message msg={errorImage} type="error" />}

        </div>

        <div className={styles.profilePet}>
          <div>
            <TextInput required={true} label={'Name:'}
              value={name} attValue={value => setName(value)}
            />
            <TextInput required={true} label={'Weight:'}
              value={weight} attValue={value => setWeight(value)}
            />
            <TextInput required={true} label={'Color:'}
              value={color} attValue={value => setColor(value)}
            />
         
            <TextInput required={true} label={'Breed:'}
              value={breed} attValue={value => setBreed(value)}
            />


          </div>
          <div>
            <TextInput required={true} label={'Microchip number:'}
              value={microchip} attValue={value => setMicrochip(value)}
            />
            <TextInput required={true}  label={'Date of Birth:'} type={'date'}
              value={birth} attValue={value => setBirth(value)}
            />

            <select required value={gender} onChange={(e) => setGender(e.target.value)} className={styles.selectGender}>
              <option value="">Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>

          </div>
        </div>
        {
          !errorImage && (<button className={styles.submitBtn} >Create new profile</button>)
        }

      </form>
    </section>
  )
}

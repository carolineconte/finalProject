import styles from "./OwnerRegister.module.css";

import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { Message } from "../../components/msg/Message";


export const OwnerRegister = () => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))


    const [name, setName] = useState('')
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [errorImage, setErrorImage] = useState('')

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

    const handleSubmit = (e) => {
        e.preventDefault()

        const owner = {
            _id:user._id,
            name,
            image,
        }

        const formData = new FormData();
        for (const key in owner) {
            formData.append(key, owner[key]);
        }

        fetch('http://localhost:3000/owner/newprofile', {
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
        <section className='formProfileContainer'>
            <form onSubmit={handleSubmit}>
                <h1 className='contorno'>Create your profile:</h1>
                <div className="inputImg">
                    {
                        ((previewImage) ?
                            (<img className="profile-image"
                                src={URL.createObjectURL(previewImage)} alt={user.name} />
                            )
                            : (<img src="/add-profile-pic.jpg" alt="add profile picture" />)
                        )
                    }
          <button  className={styles.fileBtn}  onClick={handleButtonClick}>Add a new Picture</button>
          <input ref={inputRef} style={{ display: 'none' }} type="file" onChange={handleFile} />
          {errorImage && <Message msg={errorImage} type="error" />}

                </div>

                <div className="flex">
                    <label>
                        Name:
                        <input type="text" placeholder='Name'
                        required value={name} onChange={(e) =>setName(e.target.value)}/>
                    </label>

                </div>

                <button className='btnProfile'>Create</button>
            </form>
        </section>
    )
}

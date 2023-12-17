/* eslint-disable react/prop-types */
import { uploads } from "../../utils/config";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Message } from "../../components/msg/Message";
export const AccountContainer = ({ styles, setPreviewImage, previewImage, id, account, name, image, handleProfileUpdates }) => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const [message, setMessage] = useState('')
  const [newError, setError] = useState('')
  const [password, setNewPassword] = useState('')
  const [errorImage, setErrorImage] = useState('')

  //Imagem
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

  //ALTERAR SENHA
  const handleChangePassword = (e) => {
    e.preventDefault()

    const userUpdate = {
      password,
    };

    const fetchUpdateUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${user._id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userUpdate),
        });

        const data = await response.json();

        if (response.ok) {
          setNewPassword('')
          setMessage('Successful change')
        } else {
          console.error('Error:', response.status)
          if(data.error){
             setError(data.errors[0])
          }
          setMessage('Error changing password. Please try again.');
        }
      } catch (error) {
        console.error('Request error:', error);
        setMessage('Request error. Please try again.');
      }
    };
    fetchUpdateUser();
  }
  
  //DELETAR CONTA
  const deleteAccount = (e) => {
    e.preventDefault()

    const fetchDeleteUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          }
        });

        if (response.ok) {
          navigate('/')
          localStorage.removeItem('user')
        } else {
          console.error('Erro ao obter usuário:', response.status);
        }
      } catch (error) {
        console.error('Erro na solicitação:', error);
      }
    };
    fetchDeleteUser();
  }

  const inputRef = useRef(null)
  const handleButtonClick = (e) => {
    e.preventDefault()
    // Simular o clique no campo de entrada de arquivo
    inputRef.current.click();
  };
  return (
    <>

      <div className={styles.ImgContainer}>
        {
          ((previewImage) ?
            (<img className='profile-img'
              src={URL.createObjectURL(previewImage)} alt={name} />
            )
            : (
              <img className='profile-img' src={`${uploads}/users/${image?.filename}`} alt={name} />
            ))
        }
        <div className={styles.ChangeProfileImgBtn}>
          <button onClick={handleButtonClick}>Select a new image</button>
          <input onChange={handleFile} ref={inputRef} style={{ display: 'none' }} type="file" />
          {errorImage && <Message msg={errorImage} type="error" />}
          {(!errorImage && previewImage) && (<input type="submit" onClick={() => handleProfileUpdates()} value='Save' />)}
        </div>
      </div>

      <div className='account-content'>
        <h1 className='profile-title contorno'>Hello, {name}!!</h1>
        <div className='account-info'>
          <p><span>Email:</span>{account.email}</p>
          <div className='update-password'>
            <input type="text" placeholder='Change your password'
              value={password} onChange={(e) => setNewPassword(e.target.value)} />
            {!message && <button onClick={handleChangePassword} className='btn-Profile yellow'>Update password</button>}
            {message && <button className='btn-Profile green'>{message}</button>}
          </div>
          {newError && <Message msg={newError} type="error" />}

          <button className='btn-Profile red' onClick={deleteAccount}>Delete Account</button>
        </div>
      </div>

    </>
  )
}

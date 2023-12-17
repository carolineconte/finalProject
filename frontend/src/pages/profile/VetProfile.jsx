import './profile.css'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { uploads } from "../../utils/config";
import { Message } from "../../components/msg/Message";

import { AddToFavorites } from '../../components/AddToFavorites/AddToFavorites';

export const VetProfile = () => {

  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))
  const { id } = useParams();

  const isCurrentUser = id === user._id;
  const [newError, setError] = useState('')
  const [account, setAccount] = useState('')
  const [profile, setProfile] = useState({});
  const [password, setNewPassword] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')

  const { name, image, specialization, addressStreet, addressN,
    addressCity, addressCAP, addressCountry, contactPhone,
    contactCell, schedule, bio
  } = profile


  //CARREGAR DADOS PERFIL
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/professional/profile/${id}`);
        if (res.ok) {
          const dadosJson = await res.json();
          setProfile(dadosJson);
          setIsLoading(false)
        } else {
          console.error('Erro ao buscar dados:', res.status);
        }
      } catch (erro) {
        console.error('Erro na solicitação:', erro);
      }
    };
    fetchData();
  }, [id]);

  //CARREGAR DADOS DA CONTA
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        // Faz uma solicitação ao seu servidor para obter os dados do usuário atual
        const response = await fetch(`http://localhost:3000/api/users/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }

        });

        if (response.ok) {
          const userData = await response.json();
          setAccount(userData);
        } else {
          console.error('Erro ao obter usuário:', response.status);
        }
      } catch (error) {
        console.error('Erro na solicitação:', error);
      }
    };

    fetchCurrentUser();
  }, [id]);

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
          localStorage.removeItem('user')
          navigate('/')

        } else {
          console.error('Erro ao obter usuário:', response.status);
        }
      } catch (error) {
        console.error('Erro na solicitação:', error);
      }
    };
    fetchDeleteUser();
  }

  //NAVEGAR PARA A PAGINA PARA EDITAR PERFIL
  const editProfile = (e) => {
    e.preventDefault()
    navigate('/professional/editprofile')
  }

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
      
             setError('The password must contain 6 characters.')
         
          setMessage('Error changing password. Please try again.');
        }
      } catch (error) {
        console.error('Request error:', error);
        setMessage('Request error. Please try again.');
      }
    };
    fetchUpdateUser();
  }
console.log(newError)
  return (
    <>
      {isLoading ? (<p>Carregando pagina...</p>) :
        (<div className='profileContainer'>
          {
            isCurrentUser && (
              <div className='accountContainer'>

                <img className='profile-img' src={`${uploads}/prof/${image?.filename}`} alt={image?.originalname} />

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

              </div>
            )
          }
          {!isCurrentUser && (
            <div className='visit'>
              <img className='profile-img' src={`${uploads}/prof/${image?.filename}`} alt={image?.originalname} />
              <h1>Dr. {name}</h1>
              <h2>{specialization}</h2>
            </div>
          )}
          <div className='profile'>
            <div className='profileContent'>
              <h2 className='contorno'>Contact:</h2>
              <p><span>Phone:</span> {contactPhone}</p>
              <p><span>Cell:</span> {contactCell}</p>
            </div>

            <div className='profileContent'>
              <h2 className='contorno'>Address:</h2>
              <p>Street: {addressStreet}, {addressN}</p>
              <p>{addressCAP} - {addressCity} - {addressCountry}</p>
            </div>
            <div className='profileContent'>
              <h2 className='contorno'>Schedule:</h2>
              <pre>{schedule}</pre>
            </div>
            <div className='profileContent'>
              <h2 className='contorno' >Bio:</h2>
              <p><span className='contorno'>Specialization: </span>{specialization}</p>
              <p>{bio}</p>
              {!isCurrentUser && <AddToFavorites idVet={id} idOwner={user._id} />}
            </div>
            {
              isCurrentUser && (
                <div className='profile-btns'>
                  <button className='btn-Profile yellow' onClick={editProfile}>Edite Profile</button>
                  <button className='btn-Profile red'>Delete Profile</button>
                </div>
              )
            }

          </div>
        </div>)
      }

    </>
  )
}

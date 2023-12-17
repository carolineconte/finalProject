import './profile.css'
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Message } from "../../components/msg/Message";

import { uploads } from "../../utils/config";

export const EditVetProfile = () => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))

    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [errorImage, setErrorImage] = useState('')

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [specialization, setSpecialization] = useState('');

    const [addressStreet, setAdressStreet] = useState('')
    const [addressN, setAdressN] = useState('')
    const [addressCity, setAdressCity] = useState('')
    const [addressCAP, setAdressCAP] = useState('')
    const [addressCountry, setAdressCountry] = useState('')

    const [contactPhone, setContactPhone] = useState('')
    const [contactCell, setContactCell] = useState('')

    const [schedule, setSchedule] = useState('');
    const [bio, setBio] = useState('');

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/professional/profile/${user._id}`);
                if (res.ok) {
                    const dado = await res.json();
                    setImage(dado.image);
                    setEmail(dado.email);
                    setName(dado.name);
                    setSpecialization(dado.specialization);
                    setAdressStreet(dado.addressStreet)
                    setAdressN(dado.addressN)
                    setAdressCity(dado.addressCity)
                    setAdressCAP(dado.addressCAP)
                    setAdressCountry(dado.addressCountry)
                    setContactPhone(dado.contactPhone)
                    setContactCell(dado.contactCell)
                    setSchedule(dado.schedule);
                    setBio(dado.bio);

                } else {
                    console.error('Erro ao buscar dados:', res.status);
                }
            } catch (erro) {
                console.error('Erro na solicitação:', erro);

            }
        };
        fetchData();
    }, [user._id]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const profile = {
            _id: user._id, name, email, role, image, specialization, addressStreet,
            addressN, addressCity, addressCAP, addressCountry, contactPhone, contactCell, schedule, bio
        };

        const formData = new FormData();
        for (const key in profile) {
            formData.append(key, profile[key]);
        }

        try {
            const response = await fetch(`http://localhost:3000/professional/editprofile`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                navigate(`/professional/profile/${user._id}`);
            } else {
                console.error('Erro:', response.statusText);
            }
        } catch (error) {
            console.error('Erro:', error);
        }

    }

    return (
        <section className='formProfileContainer'>

            <form onSubmit={handleSubmit}>
                <h1 className='contorno'>Create your profile:</h1>
                <div className="input-box-profile">
                    <div className="inputImg">
                        {
                            ((previewImage) ?
                                (<img className="profile-image"
                                    src={URL.createObjectURL(previewImage)} alt={name} />
                                )
                                : (<img src={`${uploads}/prof/${image?.filename}`} alt={name} />)
                            )
                        }

                        <button className='btnProfile' onClick={handleButtonClick}>Add a new Picture</button>
                        <input ref={inputRef} style={{ display: 'none' }} type="file" onChange={handleFile} />
                        {errorImage && <Message msg={errorImage} type="error" />}


                    </div>

                    <div className="flex">
                        <label>
                            Name:
                            <input type="text" placeholder='Name' value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </label>


                        <label>
                            Specialization:
                            <input type="text" placeholder='Specialization' value={specialization}
                                onChange={(e) => setSpecialization(e.target.value)} />
                        </label>
                    </div>
                </div>

                <div>
                    <h2 className='contorno'>Adress:</h2>
                    <div className="input-box TextInput">
                        <input type="text" placeholder='Street'
                            name="street" value={addressStreet}
                            onChange={(e) => setAdressStreet(e.target.value)} />
                        <input type="text" placeholder='N'
                            name="n" value={addressN}
                            onChange={(e) => setAdressN(e.target.value)} />
                    </div>

                    <div className="input-box TextInput">
                        <input type="text" placeholder='City'
                            name="city" value={addressCity}
                            onChange={(e) => setAdressCity(e.target.value)}
                        />

                        <input type="text" placeholder='CAP'
                            name="cap" value={addressCAP}
                            onChange={(e) => setAdressCAP(e.target.value)}
                        />
                        <input type="text" placeholder='Country'
                            name="country" value={addressCountry}
                            onChange={(e) => setAdressCountry(e.target.value)}
                        />

                    </div>
                </div>

                <div>
                    <h2 className='contorno'>Contact:</h2>
                    <div className="input-box TextInput">
                        <input type="text" placeholder='Phone'
                            name="phone" value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                        />
                        <input type="text" placeholder='Cell'
                            name="cell" value={contactCell}
                            onChange={(e) => setContactCell(e.target.value)}
                        />
                    </div>
                </div>


                <h2 className='contorno'>Schedule</h2>
                <textarea value={schedule} placeholder="ex
                    Monday / Friday: 09 - 13 / 13 - 18
                    Saturday: 09 - 13
                    Sunday: Closed"
                    cols="30" rows="5"
                    onChange={(e) => setSchedule(e.target.value)}
                />

                <h2 className='contorno'>Bio:</h2>
                <textarea value={bio} placeholder='How would you describe yourself and your work?'
                    cols="30" rows="8"
                    onChange={(e) => setBio(e.target.value)}
                />

                <button className='btnProfile'>Edite</button>

            </form>
        </section>
    )
}

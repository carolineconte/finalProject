import styles from './Login.module.css'
//Hooks
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
//import { useDispatch, useSelector } from 'react-redux'
//Componentes
import { TextInput } from "../../components/TextInput/TextInput"
import { Button } from "../../components/Button/Button"
import { Message } from '../../components/msg/Message'
import { PasswordInput } from '../../components/PasswordInput/PasswordInput'


export const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = {
            email: email,
            password: password
        }

        const fetchLoginUser = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/users/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                })

                const data = await res.json();

                if (data._id) {
                    const userDataString = JSON.stringify(data);
                    localStorage.setItem('user', userDataString);
                }
                console.log(data)

                if (data.role) {
                    navigate(`/${data.role}/profile/${data._id}`)
                }

                if(!data.ok){
                    setError(data.errors)
                    console.log(error)
                }

            } catch (error) {
                console.log(error)
            }
        }
        fetchLoginUser()
    }
   
    return (
        <section className={`${styles.loginContainer} container`}>
            <form className='formContainer' onSubmit={handleSubmit}>
                <h1 className='contorno'>LOGIN</h1>
                <TextInput
                    label={'Email:'} placeholder={'Enter your email...'}
                    value={email} attValue={value => setEmail(value)}
                />

                <PasswordInput label="Password" value={password} onChange={setPassword} />

                {error && <Message msg={error} type="error" />}

                <Button className='btnForm'>Log in</Button>
                <Link to="/register">Dont have an account? <span>create.</span> </Link>

            </form>
        </section>
    )
}

import styles from './Register.module.css'

// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAuth } from '../../hooks/useAuth'

//Componentes
import { TextInput } from "../../components/TextInput/TextInput"
import { Button } from "../../components/Button/Button"
import { InputSelect } from "../../components/Select/Select"
import { Message } from "../../components/msg/Message"
import {PasswordInput} from '../../components/PasswordInput/PasswordInput';

//REDUX
import { register, reset } from '../../slices/authSlice'


export const Register = () => {
    const navigate = useNavigate()
    const { auth } = useAuth()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');

    //para utilizar a funcaoes do redux
    const dispatch = useDispatch()

    const { error } = useSelector((state) => state.auth)

    const handleSubmit = (e) => {
        e.preventDefault()

        const user = {
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            role: role,
        }

        dispatch(register(user))
    }
    
    const navigateProfile = () => {
        if (role === 'professional') {
            navigate('/professional/newprofile')
        } else if (role === 'owner') {
            navigate('/owner/newprofile')
        }
    }


    // resetar estados de auth
    useEffect(() => {
        dispatch(reset());
    }, [dispatch])

    return (
        <section className={`${styles.registerContainer} container`}>
            <form className='formContainer' onSubmit={handleSubmit}>
                <h1 className='contorno'>RESGISTER:</h1>

                <TextInput label={'Email:'} placeholder={'Enter your email...'}
                    value={email} attValue={value => setEmail(value)} />

                <PasswordInput label="Password" value={password} onChange={setPassword} />
                <PasswordInput label="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} />

                <InputSelect label={'Register as:'} options={['professional', 'owner']}
                    value={role} attValue={value => setRole(value)} />

                {!auth && <Button className='btnForm'>Sign up</Button>}

                {auth && !error && <button className={styles.btnForm} onClick={navigateProfile}>Next</button>}
                {error && <Message msg={error} type="error" />}

                <Link to="/login">Already have an account?<span>Sign in.</span> </Link>

            </form>
        </section>
    )
}

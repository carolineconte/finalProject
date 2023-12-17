import './Navbar.css'

//Hooks
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'

//Icons
import { FaUserAlt } from 'react-icons/fa'
import { FiLogOut } from "react-icons/fi";
//Redux
import { logout, reset } from '../../slices/authSlice'

export const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = JSON.parse(localStorage.getItem("user"))
    const [role, setRole] = useState('')

    useEffect(() => {
        if (user && user.role) {
            setRole(user.role)
        }

    }, [user])
// console.log(user)
    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())

        navigate('/')
    }

    return (
        <nav id="navbar">
            <Link to='/' className='logo'>
                <img src="/logo.png" alt="Logo petCare" />
            </Link>
            {
                user ?
                    (
                        <div className='links'>
                            <Link to={`/professional/list`}>Find a Veterinary</Link>
                            <Link to={`${role}/profile/${user._id}`}><FaUserAlt /></Link>
                            <button onClick={handleLogout}><FiLogOut /></button>
                        </div>
                    ) : (
                        <div className='links'>
                            <Link className='nav-btn' to="/register"> Register </Link>
                            <Link className='nav-btn' to="/login"> Login </Link>
                        </div>
                    )
            }


        </nav>
    )
}

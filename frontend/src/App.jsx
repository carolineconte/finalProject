import './App.css'


import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { useAuth } from './hooks/useAuth'

//PAGES
import { Navbar } from './components/navbar/Navbar'
import { Start } from './pages/Home/HomePage'
import { Login } from './pages/login/Login'
import { Register } from './pages/Register/Register'

import { VetRegister } from './pages/VetRegisterAndEdit/VetRegister'
import { VetProfile } from './pages/profile/vetProfile'
import { EditVetProfile } from './pages/VetRegisterAndEdit/EditVetProfile'
import { VetList } from './pages/VetList/VetList'

import { PetRegister } from './pages/PetRegister/PetRegister'
import { PetProfile } from './pages/PetProfile/PetProfile'

import { OwnerRegister } from './pages/OwnerRegister/OwnerRegister'
import { OwnerProfile } from './pages/OwnerProfile/OwnerProfile'


function App() {
  const { auth, loading } = useAuth()


  if (loading) {
    return <p>Carregando...</p>
  }

  return (

    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Start />} />
          <Route path='/login' element={!auth ? <Login /> : <Navigate to="/" />} />
          <Route path='/register' element={ <Register /> } />

          {/* <Route path='/profissional' element={auth ? <VetRegister /> : <Navigate to="/login" />} /> */}

          <Route path='/professional/newprofile' element={<VetRegister />} />
          <Route path='/professional/editprofile' element={<EditVetProfile />} />
          <Route path='/professional/profile/:id' element={<VetProfile />} />

          <Route path='/professional/list' element={<VetList />} />

          <Route path='/newPet' element={<PetRegister />} />
          <Route path='/petprofile/:id' element={<PetProfile />} />

          <Route path='/owner/newprofile' element={<OwnerRegister />} />
          <Route path='/owner/profile/:id' element={<OwnerProfile />} />
          
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App

import React from 'react'
import Navbar from './components/shared/Navbar'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home from './components/Pages/Home'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Marketplace from './components/pages/farmer/Marketplace'
import ContactBuyer from './components/pages/farmer/ContactBuyer'
import Weather from './components/farmer/Weather'


function App() {
  return (
    <BrowserRouter>
    <div className="flex flex-col min-h-screen">
              <Navbar/> 

  <main className="flex-grow">
 <Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/market' element={<Marketplace/>}/>
  <Route path='/contact-buyer' element={<ContactBuyer/>}/>
  <Route path="/weather" element={<Weather/>} />

 </Routes>
 </main>
</div>
    </BrowserRouter>
  )
}

export default App
import React from 'react'
import Navbar from './components/shared/Navbar'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Marketplace from './components/pages/farmer/Marketplace'
import Mandi from './components/pages/farmer/Mandi'
import ContactBuyer from './components/pages/farmer/ContactBuyer'
<<<<<<< HEAD
import FarmerDashboard from './components/dashboards/FarmerDashbooard'
=======
import BuyerDashboard from './components/pages/Buyer/BuyerDashboard'
import Weather from './components/farmer/Weather'
import Home from './components/pages/Home'
>>>>>>> f4d9f513ea689358bbd45242daf256a7447d931e


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
  <Route path='/buyer-dashboard' element={<BuyerDashboard/>}/>
  <Route path='/market' element={<Marketplace/>}/>
<<<<<<< HEAD
  <Route path='/contact-buyer' element={<ContactBuyer/>}/>
  /* farmer dashboard routing */
  <Route path='/Farmer-dashboard' element={<FarmerDashboard />}/>
=======
  <Route path='/market/:mandi' element={<Mandi/>}/>
  <Route path='/market/:mandi/contact-buyer' element={<ContactBuyer/>}/>
  <Route path="/weather" element={<Weather/>} />
>>>>>>> f4d9f513ea689358bbd45242daf256a7447d931e

 </Routes>
 </main>
</div>
    </BrowserRouter>
  )
}

export default App
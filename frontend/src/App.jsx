import React from 'react'
import Navbar from './components/shared/Navbar'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Marketplace from './components/pages/farmer/Marketplace'
import Mandi from './components/pages/farmer/Mandi'
import ContactBuyer from './components/pages/farmer/ContactBuyer'
import FarmerDashboard from './components/dashboards/FarmerDashbooard'
import BuyerDashboard from './components/pages/Buyer/BuyerDashboard'
import Weather from './components/farmer/Weather'
import Home from './components/pages/Home'


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
  <Route path='/contact-buyer' element={<ContactBuyer/>}/>
  /* farmer dashboard routing */
  <Route path='/Farmer-dashboard' element={<FarmerDashboard />}/>
  <Route path='/market/:mandi' element={<Mandi/>}/>
  <Route path='/market/:mandi/contact-buyer' element={<ContactBuyer/>}/>
  <Route path="/weather" element={<Weather/>} />

 </Routes>
 </main>
</div>
    </BrowserRouter>
  )
}

export default App
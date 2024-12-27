import React, { Suspense, useEffect, useState } from 'react'
import './App.css'
// import Navbar from './Components/Navbar/Navbar'
const Navbar = React.lazy(()=>import("./Components/Navbar/Navbar"))
// import Home from './Pages/Home/Home'
const Home = React.lazy(()=> import("./Pages/Home/Home"))
import {Route, Routes} from 'react-router-dom'
// import Video from './Pages/Video/Video'
const Video = React.lazy(()=>import("./Pages/Video/Video"))
// import Profile from './Pages/Profile/Profile'
const Profile = React.lazy(()=>import("./Pages/Profile/Profile"))
// import SignUp from './Pages/SignUp/SignUp'
const SignUp = React.lazy(()=>import("./Pages/SignUp/SignUp"))
// import VideoUpload from './Pages/videoUpload/VideoUpload'
const VideoUpload = React.lazy(()=>import("./Pages/videoUpload/VideoUpload"))

function App() {

const [sideNavbar, setSideNavbar] = useState(true);

const setSideNavbarFunc = (value) => {
  setSideNavbar(value)
}
  return (
    <>
    <Suspense fallback={<div>Loading</div>}>
     <Navbar setSideNavbarFunc={setSideNavbarFunc} sideNavbar={sideNavbar}/>
     <Routes>
      <Route path='/' element={<Home sideNavbar={sideNavbar}/>}/>
      <Route path='/watch/:id' element={<Video/>}/>
      <Route path='/user/:id' element={<Profile sideNavbar={sideNavbar}/>}/>
      <Route path='/:id/upload' element= {<VideoUpload/>}/>
      <Route path='/signup' element={<SignUp/>}/>
     </Routes>
     </Suspense>
    </>
  )
}

export default App

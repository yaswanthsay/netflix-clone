import React, { useEffect, useState } from 'react'
import netflix from "../images/netflix.png"
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/setup'
import { signOut } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Trailer from './Trailer'

function Navbar() {

    const logout = async()=>{
        try{
            await signOut(auth)
            toast.success("Loggedout successfully",{
                theme:"dark"
            })
        }catch(err){
           console.error(err)
        }
    }

    const navigate = useNavigate()

    const [movies,setMovies] = useState([])

    const getMovie = ()=>{
        try{
            fetch("https://api.themoviedb.org/3/discover/movie?api_key=aafa86502a60244c7844fcc84ca5ecce")
            .then(res => res.json())
            .then(json => setMovies(json.results))
        }catch(err){
           console.error(err)
        }
    }

    const signinClick = ()=>{
       navigate("/signin")
    }

    useEffect(()=>{
      getMovie()
    },[])



  return (
    <div style={{backgroundImage:`linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://image.tmdb.org/t/p/original${movies[11]?.poster_path})`,backgroundPosition:"center",
        backgroundRepeat:"no-repeat",backgroundSize:"cover",height:"500px",width:"100%"}}>
            <ToastContainer autoClose={2000}/>
        <div style={{display:"flex",justifyContent:"space-between",padding:"20px"}}>
        <img style={{width:"90px",height:"90px"}} src={netflix}/>
        <div>
        {auth.currentUser?.emailVerified ? <Button onClick={logout} variant='contained' color="error" sx={{height:"40px",marginLeft:"10px"}}>Logout</Button>
        :<Button onClick={signinClick} color='error' variant='contained' sx={{height:"40px"}}>SignIn</Button>}
        </div>
        </div>
        <div style={{padding:"20px"}}>
            <h1 style={{color:"#F1F1F1",fontSize:"70px",fontFamily:"initial"}}>{movies[11]?.original_title}</h1>
            <h3 style={{color:"#F1F1F1"}}>{movies[11]?.overview}</h3>
            <Trailer movieId={movies[11]?.id}/>
        </div>
    </div>
  )
}

export default Navbar

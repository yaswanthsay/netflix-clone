import { Button, Grid, TextField } from '@mui/material'
import { addDoc, collection, doc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { auth, database } from '../firebase/setup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Trailer from './Trailer'

function MovieDetail() {

   const [review,setReview] = useState("")
   const [reviewData,setReviewData] = useState([])

    const location = useLocation()

  

    const moviewRef = doc(database,"Movies",`${location.state?.movie.id}`)
    const reviewRef = collection(moviewRef,"Reviews")




    const addReview = async()=>{
        try{
         auth.currentUser && await addDoc(reviewRef,{
                movieReview:review,
                email:auth.currentUser?.email,
                username:auth.currentUser?.displayName,
                profile_image:auth.currentUser?.photoURL
            })
          auth.currentUser ? toast.success("Review added succesfully",{
                theme:"dark"
            }) 
            : toast.warning("Please login")
        }catch(err){
            console.error(err)
        }
    }

    const showReview = async()=>{
        try{
           const data =  await getDocs(reviewRef)
           const filteredData = data.docs.map((doc)=>({
                ...doc.data(),
                id:doc.id
           }))
           setReviewData(filteredData)
        }catch(err){
            console.error(err)
        }  
    }

    useEffect(()=>{
       showReview() 
    },[reviewData])

   

  return (
    <div style={{backgroundColor:"black",height:"100%"}}>
    <Grid container >
        <Grid item xs={8}>
        <div style={{backgroundImage:`linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://image.tmdb.org/t/p/original${location.state?.movie?.poster_path})`,height:"100vh",
        backgroundSize:"cover",backgroundRepeat:"no-repeat"}}>
            <ToastContainer autoClose={2000}/>
            <div style={{paddingTop:"150px",paddingLeft:"30px",paddingRight:"10px"}}>
            <h1 style={{color:"red",fontSize:"50px"}}>{location.state?.movie?.original_title}</h1>
            <div style={{display:"flex"}}>
            <h4 style={{color:"white"}}>Language : {location.state?.movie?.original_language} - </h4>
            <h4 style={{color:"white"}}> Release date : {location.state?.movie?.release_date}</h4>
            </div>
          <h3 style={{color:"white",fontWeight:"100"}}>{location.state?.movie?.overview}</h3>
          <Trailer location={location}/>
            </div> 
        </div>
        </Grid>
        <Grid item xs={4}>
        <div style={{backgroundColor:"black",padding:"20px"}}>
            <Grid container>
            <div>
                <h5 style={{color:"#A4A4A4",fontWeight:"100"}}>ADD REVIEW</h5>
              <TextField onChange={(e)=>setReview(e.target.value)}  size='small' label="Review" variant='outlined' style={{backgroundColor:"white",borderRadius:"5px"}}/>
              <Button onClick={addReview} sx={{ml:"10px",bgcolor:"red",color:"white"}} variant='contained' >Submit</Button>
            </div>
            </Grid>
            <div style={{paddingTop:"10px"}}>
            {reviewData.map((each)=>{
                return <>
                <div style={{display:"flex"}}>
                <img style={{width:"20px",borderRadius:"50px"}} src={each.profile_image}/>
                <li style={{color:"grey",paddingLeft:"10px"}}>{each.username}</li>
                </div>
                <h6 style={{color:"grey"}}>{each.movieReview}</h6>
                </>
            })}
            </div>
        </div>
        </Grid>
    </Grid>
    </div>
  )
}

export default MovieDetail

import React, { useEffect } from 'react'
import Navbar from '../components/NavBar'
import {useState} from "react"
import RateLimited from '../components/RateLimited'
import NotesNotFound from '../components/NotesNotFound'
import NoteCard from '../components/NoteCard'
import api from '../lib/axios'
import toast from 'react-hot-toast'

const HomePage = () => {
  const [rateLimited , setRateLimited] = useState(false);
  const [notes,setNotes] = useState([])

  const  [loading, setLoading] = useState(true)
  
   useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/");
        console.log(res.data);
        setNotes(res.data);
        setRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error.response);
        if (error.response?.status === 429) {
          setRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (rateLimited) {
    return (
      <div className='min-h-screen'>
        <Navbar/>
        <RateLimited/>
      </div>
    )
  }

  return (
    <div className='min-h-screen'>
        <Navbar/>
        <div className='max-w-7xl mx-auto p4 mt-6'>
          {loading && <div className='text-center text-primary py-10'>Loading Notes...</div> }

          {!loading && notes.length===0 && (
           <NotesNotFound/>
          )}

          {notes.length>0 && !rateLimited &&(
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
              {notes.map(note=>(
                <NoteCard key = {note._id} note = {note} setNotes={setNotes} />
              ))}
            </div>
          )}
        </div>
    </div>
  )
}

export default HomePage

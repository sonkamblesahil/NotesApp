import Note from '../models/notes.js'

export async function  getAllNotes (req,res){
     try {
          const notes = await Note.find()
          res.status(200).json(notes)
     } catch (error) {
          console.error("Error fetching notes:", error)
          res.status(500).json({ message: "Error fetching notes", error })
     }
}

export async function getNoteById(req,res){
      try {
          const note = await Note.findById(req.params.id)
          if(!note){
               return res.status(404).json({message:"note not found"})
          }
          res.status(200).json(note)
      } catch (error) {
          console.error("Error fetching note:", error)
          res.status(500).json({ message: "Error fetching note", error })
      }
}

export  async function createNote (req,res){
    try {
          const {title,content} = req.body
          const newNote = new Note({title,content})
          await newNote.save()
          res.status(201).json(newNote)

          console.log(title,content)
    } catch (error) {
     console.error("Error creating note:", error)
     res.status(500).json({ message: "Error creating note", error })
    }
}

export async function updateNote (req,res){
     try{

          const {title,content} = req.body
          const updated = await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true})
          if(!updated){
               return res.status(404).json({message:"Note not found"})
          }
          res.status(200).json(updated)

          
     }catch(error){
          console.error("Error updating note:", error)
          res.status(500).json({ message: "Error updating note", error })
     }
}

export async function deleteNote (req,res){
     try {
        const deleted = await Note.findByIdAndDelete(req.params.id)
        if(!deleted){
          return res.status(404).json({message:"Note not found"})
        }
        res.status(200).json(deleted)
     } catch (error) {
          console.error("Error deleting note:", error)
          res.status(500).json({ message: "Error deleting note", error })
     }
}



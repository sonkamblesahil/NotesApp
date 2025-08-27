import React from 'react'
import {PlusIcon} from "lucide-react"
import {Link} from "react-router-dom"


const NavBar = () => {
  return <header className='bg-base-300 border-b border-base-content/10'>
    <div className='mx-auto max-w-6xl px-4 py-4 '>
        <div className='flex items-center justify-between'>
            <h1 className='font-bold text-primary text-3xl tracking-tight font-mono'>
               noteBoard

            </h1>
            <div className='flex items-center gap-4'>
                <Link to="/create" className='btn btn-primary font-bold'>
                <PlusIcon className='size=5' />
                <span>Create note</span>
                </Link>
            </div>


        </div>

    </div>
  </header>
}

export default NavBar

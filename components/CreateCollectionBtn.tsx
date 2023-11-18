'use client';
import React, { useState } from 'react'
import { Button } from './ui/button'
import Sidebar from './Sidebar';

function CreateCollectionbtn() {
    const [open, setOpen]=useState(false);
    const handleOpenChange=(open:boolean) => setOpen(open);
  return (
    <div className='w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[1px]'>
        <Button onClick={()=>setOpen(true)} variant={'outline'} className='dark:text-white w-full dark:bg-neutral-950 bg-white'>
        <span className='bg-gradient-to-r from-red-500 to-orange-500 hover:to-orange-800 bg-clip-text text-transparent'>Create collection</span>
    </Button>
    <Sidebar open={open} onOpenChange={handleOpenChange} />
    </div>
  )
}

export default CreateCollectionbtn

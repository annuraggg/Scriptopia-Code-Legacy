import { useState, useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Navbar } from "../../components/ui/navbar"
import Table from "./table"
import Loader from "../../components/Loader"



const Leaderboards = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {
        loading ? <Loader />

          :
          <>
            <header><Navbar /></header>
            <div className='flex row-auto justify-center mt-7'>
              <h1 className='mt-1'>Leaderboard</h1>
              <div className='flex row-auto ml-10 bg-secondary rounded-full'>
                <ul className=" flex row space-x-3 ml-6 mr-6 mt-1 mb-1 list-none">
                  <li>
                    <DropdownMenu>
                      <DropdownMenuTrigger className='bg-primary-foreground rounded-full mt-0.5'>
                        <h4 className='ml-3 mr-3 mt-1 mb-1 font-medium hover:text-gray-400'>sort by</h4>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Course Completed</DropdownMenuItem>
                        <DropdownMenuItem>Interviews Done</DropdownMenuItem>
                        <DropdownMenuItem>Average Grade</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                  <li>
                    <DropdownMenu>
                      <DropdownMenuTrigger className='bg-primary-foreground rounded-full mt-0.5'>
                        <h4 className='ml-3 mr-3 mt-1 mb-1 font-medium hover:text-gray-400'>Courses</h4>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Learning Python</DropdownMenuItem>
                        <DropdownMenuItem>Internet of Things</DropdownMenuItem>
                        <DropdownMenuItem>Celenois Process Mining</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                  <li><Button variant="secondary" className='hover:text-gray-400 bg-slate-700 rounded-full h-[4.5vh]'>Last 30 Days</Button></li>
                  <li className='mt-1.5 hover:text-gray-400'>All time</li>
                </ul>
              </div>
            </div>
            <Table />
          </>
      }
    </>
  )
}

export default Leaderboards

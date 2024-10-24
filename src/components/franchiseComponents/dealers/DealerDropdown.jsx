import React from 'react'
import { IoMdArrowDropdown  } from "react-icons/io";

function DealerDropdown() {
  return (
    <div className="relative inline-block rounded-full px-5 py-2 gap-1 bg-blue_bg items-center border-2 text-violet text-sm font-medium border-violet">
        <select className="appearance-none focus:outline-none bg-blue_bg px-5 pr-8 rounded-full">
            <option className='p-1 bg-white' value="">Newest</option>       
            <option className='p-1 bg-white' value="">Oldest</option>
        </select>
        <div className="absolute inset-y-0 right-2 flex items-center px-2 pointer-events-none">
            <IoMdArrowDropdown size={24} />
        </div>
    </div>
  )
}

export default DealerDropdown
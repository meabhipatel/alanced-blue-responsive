import React from 'react'

const SideNav = () => {
  return (
    <>
    <div className=" w-56">
      <ul className="text-left">
        <li className="px-6 py-2 hover:bg-blue-600 cursor-pointe rounded-full hover:text-white font-semibold text-base">Add Portfolio</li>
        <li className="px-6 py-2 hover:bg-blue-600 cursor-pointe rounded-full hover:text-white font-semibold text-bas">Select Templete</li>
        <li className="px-6 py-2 hover:bg-blue-600 cursor-pointe rounded-full hover:text-white font-semibold text-bas">Add Details</li>
        <li className="px-6 py-2 hover:bg-blue-600 cursor-pointe rounded-full hover:text-white font-semibold text-bas">Preview</li>
      </ul>
    </div>
    </>
  )
}

export default SideNav

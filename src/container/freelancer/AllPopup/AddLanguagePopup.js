import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const AddLanguagePopup = ({ closeAddLanguage }) => {

    const [selectedLanguage, setSelectedLanguage] = useState("");
    const languages = ["English", "Spanish", "French","Hindi"];

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto mt-10">
    <div className="fixed inset-0 bg-black opacity-50"></div>
    <div className="flex items-center justify-center min-h-screen">
    <div className="bg-white rounded-lg w-[90%] md:w-[50%] p-6 px-8 relative z-20">
    <div className="flex justify-between items-center">
        <h1 className="font-cardo text-[26px] text-[#031136] font-normal">Add Language</h1>
        <button onClick={closeAddLanguage} className="text-gray-500 hover:text-gray-700">
            <i class="bi bi-x-lg"></i>
        </button>
    </div>
    <div className='mt-10'>
    <div className="flex justify-between items-center mt-2 mb-6">

            <div className="flex flex-col flex-1 mr-5">
                <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left mb-2">Language</h1>
                <select 
                    value={selectedLanguage} 
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="border py-2 px-2 rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 flex-1 bg-white opacity-50"
                >
                    <option value="" disabled>Select Language</option>
                    {languages.map(language => (
                        <option key={language} value={language}>{language}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col flex-1">
                <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left mb-2">Proficiency</h1>
                <select className="border py-2 px-2 rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 flex-1 bg-white opacity-50">
                    <option value="" disabled selected>Language Proficiency</option>
                    <option value="">Basic</option>
                    <option value="">Conversational</option>
                    <option value="">Fluent</option>
                    <option value="">Native or Bilingual</option>
                </select>
            </div>

            </div>

            <div className="mt-8 flex justify-end">
            <Link to=''><span class="inline-block text-sm px-4 py-[10px] bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-3 font-semibold" >Add</span></Link>
            <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]" onClick={closeAddLanguage}>
                <Link to=''><button class="px-2 py-1 bg-white"><p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">Cancel</p></button></Link>
            </div>     
            </div>
            </div>
</div>
    </div>
</div>
  )
}

export default AddLanguagePopup
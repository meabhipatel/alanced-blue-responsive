import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoryList from '../../freelancer/AllSelectionData/CategoryList';
import { useRef } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const EditCategoryPopup = ({closeJobCategory,project}) => {

    // const accessToken = useSelector(state => state.login.accessToken);
    const accessToken = useSelector(state => state.login.accessToken) || localStorage.getItem('jwtToken');
    const [jobCategory, setJobCategory] = useState(project.category);
    const id = project.id;

    const handleSave = async () => {
        try {
            const response = await axios.put(`https://www.api.alanced.com/freelance/update/project/${id}`, {
                category: jobCategory,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (response.data.status === 200) {
                toast.success("Job Category Updated Successfully")
                closeJobCategory();
            } else {
                console.log(response.data.message || 'Error updating the job category');
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    const [categories] = useState(CategoryList.sort());


    const [searchTerm, setSearchTerm] = useState(jobCategory || ""); 
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);
    
    const filteredCategories = categories.filter(
        category => category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    

  return (
    <>
    <style>
    {`
    .dropdown-list {
        border: 1px solid #ccc;
        max-height: 200px;
        overflow-y: auto;
        position: absolute;
        width: 90%;
        z-index: 1000;
        list-style: none;
        padding: 0;
        margin: 0;
        background-color: #fff;
    }
    
    .dropdown-list li {
        padding: 10px;
        cursor: pointer;
    }

    .dropdown-list li:hover {
        background-color: #f7f7f7;
    }
    `}</style>
    <div className="fixed z-10 inset-0 overflow-y-auto mt-12">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="flex items-center justify-center min-h-screen">
                    <div className="bg-white rounded-lg w-[90%] md:w-[50%] p-6 px-8 relative z-20">
                    <div className="flex justify-between items-center">
                        <h1 className="font-cardo text-[26px] text-[#031136] font-normal">Edit Category</h1>
                        <button onClick={closeJobCategory} className="text-gray-500 hover:text-gray-700">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <div className='mt-8'>
                    <div ref={wrapperRef}>
    <input 
        type="text" 
        value={jobCategory} 
        onClick={() => setIsOpen(!isOpen)} 
        onChange={e => {
            setSearchTerm(e.target.value);
            setJobCategory(e.target.value);
            setIsOpen(true);
        }} 
        className='border my-2 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'
        placeholder="Select Category" 
    />
    {isOpen && (
    <ul className="dropdown-list">
        {filteredCategories.length > 0 ? (
            filteredCategories.map((cat, index) => (
                <li 
                    key={index} 
                    onClick={() => {
                        setSearchTerm(cat);
                        setJobCategory(cat);
                        setIsOpen(false);
                    }}
                >
                    {cat}
                </li>
            ))
        ) : (
            <li>No results found</li>
        )}
    </ul>
)}

</div>
                            <div className="mt-8 flex justify-end">
                            <Link to='' onClick={handleSave} state={{project}}><span class="inline-block text-sm px-4 py-[10px] bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-3 font-semibold" >Save</span></Link>
                            <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]" onClick={closeJobCategory}>
                                <Link to='' state={{project}}><button class="px-2 py-1 bg-white"><p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">Cancel</p></button></Link>
                            </div>     
                            </div>
                            </div>
                </div>
                    </div>
                </div>
    </>
  )
}

export default EditCategoryPopup
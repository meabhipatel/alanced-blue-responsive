import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { GetFreelancerSelfProfileAction, UpdateFreelancerProfileAction } from '../../../redux/Freelancer/FreelancerAction';
import CategoryList from '../AllSelectionData/CategoryList';

const EditTitlePopup = ({ closeEditTitle }) => {
  const accessToken = useSelector(state => state.login.accessToken) || localStorage.getItem('jwtToken');

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState(""); 
  const dispatch = useDispatch();
  const freelancerselfprofile = useSelector(state => state.freelancer.freelancerselfprofile)
  useEffect(() => {
      if (freelancerselfprofile && freelancerselfprofile[0]) {
          setCategory(freelancerselfprofile[0].category);
          setDescription(freelancerselfprofile[0].about);
      }
  }, [freelancerselfprofile]);

  const handleSave = () => {
      dispatch(UpdateFreelancerProfileAction({ category:category,about:description },accessToken));
      closeEditTitle();
      dispatch(GetFreelancerSelfProfileAction(accessToken));
  }

//   const [categories] = useState([
//     'Web Development',
//     'Web Designing',
//     'Software Development',
//     'Data Science',
//     'Logo Designing',
//     'Graphics Designing',
//     'Artificial Intelligence',
//     'Machine Learning',
//     'UI/UX Designing'
// ]);


const [categories] = useState(CategoryList.sort());


const [searchTerm, setSearchTerm] = useState(category || ""); 
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
    `}
</style>

    <div className="fixed z-10 inset-0 overflow-y-auto mt-12">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="flex items-center justify-center min-h-screen">
                    <div className="bg-white rounded-lg w-[90%] md:w-[50%] p-6 px-8 relative z-20">
                    <div className="flex justify-between items-center">
                        {/* <h1 className="font-cardo text-[26px] text-[#031136] font-normal">Edit About Me Section</h1> */}
                        <h1 className="font-cardo text-[26px] text-[#031136] font-normal">{category && category.length > 0 ? 'Edit Profile' : 'Add Profile'}</h1>
                        <button onClick={closeEditTitle} className="text-gray-500 hover:text-gray-700">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <div className='mt-8'>
                            <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left">Your Designation</h1>
                            {/* <input type="text" value={category} onChange={e => setCategory(e.target.value)} className='border my-2 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' placeholder='Python Developer'/> */}
                            <div ref={wrapperRef}>
    <input 
        type="text" 
        value={category} 
        onClick={() => setIsOpen(!isOpen)} 
        onChange={e => {
            setSearchTerm(e.target.value);
            setCategory(e.target.value);
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
                        setCategory(cat);
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

                            <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left pt-5">About You</h1>
                          <textarea name="" id="" cols="30" rows="5" value={description} onChange={e => setDescription(e.target.value)} className='border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'></textarea> 
                            <div className="mt-8 flex justify-end">
                            <Link to='' onClick={handleSave}><span class="inline-block text-sm px-4 py-[10px] bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-3 font-semibold" >Save</span></Link>
                            <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]" onClick={closeEditTitle}>
                                <Link to=''><button class="px-2 py-1 bg-white"><p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">Cancel</p></button></Link>
                            </div>     
                            </div>
                            </div>
                </div>
                    </div>
                </div>
    </>
  )
}

export default EditTitlePopup
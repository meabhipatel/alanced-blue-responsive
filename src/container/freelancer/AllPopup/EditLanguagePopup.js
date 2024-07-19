import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GetFreelancerSelfProfileAction, UpdateFreelancerProfileAction } from '../../../redux/Freelancer/FreelancerAction';
import LanguageList from '../AllSelectionData/LanguageList';

const EditLanguagePopup = ({ closeEditLanguage }) => {


const freelancerselfprofile = useSelector(state => state.freelancer.freelancerselfprofile);
//   const accessToken = useSelector(state => state.login.accessToken); 
const accessToken = useSelector(state => state.login.accessToken) || localStorage.getItem('jwtToken');
  const dispatch = useDispatch();

  const [Language, setLanguage] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (freelancerselfprofile && freelancerselfprofile[0] && freelancerselfprofile[0].Language) {
      setLanguage(JSON.parse(freelancerselfprofile[0].Language.replace(/'/g, '"')));
    }
  }, [freelancerselfprofile]);

 
  const removeLanguage = (index) => {
    setLanguage(prevLanguages => prevLanguages.filter((_, idx) => idx !== index));
    setError('');
  };

  const formatLanguagesForDispatch = (LanguageArray) => {
    const formatted = {};
    LanguageArray.forEach((language, index) => {
      formatted[`Language[${index}]`] = language;
    });
    return formatted;
  };

  const handleSave = () => {
    const formattedLanguage = formatLanguagesForDispatch(Language);
    dispatch(UpdateFreelancerProfileAction(formattedLanguage, accessToken));
    closeEditLanguage();
    dispatch(GetFreelancerSelfProfileAction(accessToken));
  };


//   const allLanguages = [
//     'Hindi', 'English', 'Gujarati', 'Marathi', 'French', 'German', 'Spanish', 'Tamil','Punjabi','Arabic','Urdu','Russian','Japanese','Bengali','Turkish','Korean','Italian'
// ];

const allLanguages = LanguageList.sort();

const [searchTermLanguage, setSearchTermLanguage] = useState(''); 
const [isOpenLanguage, setIsOpenLanguage] = useState(false);
const wrapperRefLanguage = useRef(null);

const filteredLanguages = allLanguages.filter(
    language => language.toLowerCase().includes(searchTermLanguage.toLowerCase()) && !Language.includes(language)
);

const handleClickOutsideLanguage = (event) => {
    if (wrapperRefLanguage.current && !wrapperRefLanguage.current.contains(event.target)) {
        setIsOpenLanguage(false);
    }
};

useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideLanguage);
    return () => {
        document.removeEventListener('mousedown', handleClickOutsideLanguage);
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
        width: 100%;
        z-index: 1000;
        list-style: none;
        padding: 0;
        margin: 0;
        background-color: #fff;
        margin-top:11px;
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
    <div className="fixed z-10 inset-0 overflow-y-auto mt-10">
    <div className="fixed inset-0 bg-black opacity-50"></div>
    <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg w-[90%] md:w-[50%] p-6 px-8 relative z-20">
            <div className="flex justify-between items-center">
            <h1 className="font-cardo text-[26px] text-[#031136] font-normal">
    {Language && Language.length > 0 ? 'Edit Language' : 'Add Language'}
</h1>

                <button onClick={closeEditLanguage} className="text-gray-500 hover:text-gray-700">
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>
            <div className="mt-10">
                <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left">Language</h1>
                <div className="border rounded-md p-2 flex items-center flex-wrap my-3">
    {Array.isArray(Language) && Language.map((language, index) => (
        <div key={index} className="bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border-none text-white font-semibold rounded px-2 py-1.5 mr-3 my-2 flex items-center">
            <span>{language}</span>
            <button onClick={() => removeLanguage(index)} className="ml-2 mt-1 pb-0.5 text-sm bg-white text-blue-500 rounded-full w-4 h-4 flex justify-center items-center">
                &times;
            </button>
        </div>
    ))}
    <div ref={wrapperRefLanguage} className="relative w-full">
        <input 
            type="text" 
            value={searchTermLanguage} 
            onClick={() => setIsOpenLanguage(!isOpenLanguage)} 
            onChange={e => setSearchTermLanguage(e.target.value)} 
            className='outline-none w-full'
            placeholder="Search & Select Languages"
        />
        {isOpenLanguage && (
            <ul className="dropdown-list w-full">
                {filteredLanguages.length > 0 ? (
                  filteredLanguages.map((language, index) => (
                    <li 
                        key={index} 
                        onClick={() => {
                            if (Language.length < 8) {
                                setLanguage(prev => [...prev, language]);
                                setSearchTermLanguage('');
                                setIsOpenLanguage(false);
                            } else {
                                setError('You can add a maximum of 8 Languages.');
                            }
                        }}
                    >
                        {language}
                    </li>
                ))
                ) : (
                    <li>No results found</li>
                )}
            </ul>
        )}
    </div>
</div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
            <div className="mt-8 flex justify-end">
                <Link to="" onClick={handleSave}><span className="inline-block text-sm px-4 py-[10px] bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-3 font-semibold" >Save</span></Link>
                <div className="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]" onClick={closeEditLanguage}>
                    <Link to=''><button className="px-2 py-1 bg-white"><p className="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">Cancel</p></button></Link>
                </div>
            </div>
        </div>
    </div>
</div>
</>
  )

}

export default EditLanguagePopup
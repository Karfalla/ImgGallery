import React, { useCallback, useEffect, useRef, useState } from 'react'
import Logo from '../assets/img/6531811.png'
import axios from 'axios';
import GetImg from './GetImg';
import LogoD from "../assets/img/6531812.png"

export default function NavBar() {

    const searchInput = useRef(null)
    const API_URL = "https://api.unsplash.com/search/photos"
    const API_HOME_URL = "https://api.unsplash.com/photos"
    const IMAGES_PER_PAGE = 30

    const [img, setImg] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)

    const [theme, setTheme] = useState();

    useEffect(() => {
        if (theme === "dark") {
        document.documentElement.classList.add("dark");
        } else {
        document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const handleThemeSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    console.log(theme)

    useEffect(() => {
        const fetchImg = async () => {
            const response = await fetch(
            `${API_HOME_URL}?page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY}`
            )
            const data = await response.json()
            setImg(data)
            setTotalPages(data.totalPages)
            console.log(setTotalPages(data.totalPages))
        }
        fetchImg()
    }, [page])

    const fetchImages = useCallback(async () => {
        try{
            if(searchInput.current.value){  
                const {data} = await axios.get(
                    `${API_URL}?query=${searchInput.current.value}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY}`
                ) 
                setImg(data.results)
                setTotalPages(data.total_pages)
            }
        }catch(error){
            console.log(error)
        }
    }, [page])

    useEffect(() => {
        fetchImages()
    }, [fetchImages])

    const resetSearch = () => {
        fetchImages()
        setPage(1)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          resetSearch()
        }
      };

    const handleSelection = (selection) => {
        searchInput.current.value = selection
        resetSearch()
    }

  return (
    <>
        <nav className='bg-white dark:bg-black transition-all duration-1000 ease-out'>
            <div className='w-full flex justify-between items-center  text-[#939393] py-2 pl-5 border-b border-[#939393]'>
                <div className='flex items-center w-[100%] '>
                    <img className='w-12 [@media(max-width:1000px)]:w-10' src={theme === 'dark' ? LogoD : Logo} alt="" />
                    <div className='w-full flex items-center ml-6 bg-[#E9E9E9] py-2 px-4 rounded-full dark:bg-[#c7c7c7]'>
                        <span className='text-[16pt] mr-3'><ion-icon name="search-outline"></ion-icon></span>
                        <input ref={searchInput} onKeyDown={handleKeyPress} className='bg-transparent text-[11pt] w-full outline-0 text-black dark:text-white' type="search" placeholder='Rechercher...'/>
                    </div>
                </div>
                <ul className='flex justify-center items-center text-[11pt] [@media(max-width:1000px)]:hidden'>
                    <div className='flex justify-center items-center'>
                        <li onClick={handleThemeSwitch}>
                            {
                                theme === 'dark' 
                                ? <span className='mx-2  text-white text-[14pt] px-4 rounded-full cursor-pointer transition-all duration-[3s] ease-out'><ion-icon name="sunny"></ion-icon></span>
                                : <span className='mx-2  text-black text-[14pt] px-4 rounded-full cursor-pointer transition-all duration-[3s] ease-out'><ion-icon name="moon"></ion-icon></span>
                            }  
                        </li>
                        <li className='mx-2 px-4 text-[18pt] rounded-full cursor-pointer hover:text-[#77B0AA]'><ion-icon name="add-circle-outline"></ion-icon></li>
                        <li className='mx-2 px-4 text-[18pt] rounded-full cursor-pointer hover:text-[#77B0AA]'><ion-icon name="log-out-outline"></ion-icon></li>
                    </div>
                    <li className='ml-2  px-7 py-3 border-l border-[#939393] cursor-pointer hover:text-[#77B0AA]'>Connexion</li>
                </ul>
                <span className='hidden text-5xl mx-5 text-black dark:hidden [@media(max-width:1000px)]:inline'><ion-icon name="menu-outline"></ion-icon></span>
            </div>
            <div className='flex justify-center items-center py-8 '>
                <ul className='flex justify-center items-center text-[11pt] font-semibold [@media(max-width:680px)]:text-[8pt] '>
                    <li onClick={() => handleSelection('Branding')} className='mx-1 py-2 px-4 rounded-full cursor-pointer dark:text-white transition-[color] duration-[5s] ease-out hover:bg-[#E9E9E9] hover:dark:bg-[#c7c7c7] [@media(max-width:680px)]:px-3 [@media(max-width:680px)]:mx-0'>Branding</li>
                    <li onClick={() => handleSelection('Illustration')} className='mx-1 py-2 px-4 rounded-full cursor-pointer dark:text-white transition-[color] duration-[5s] ease-out hover:bg-[#E9E9E9] hover:dark:bg-[#c7c7c7] [@media(max-width:680px)]:px-3 [@media(max-width:680px)]:mx-0'>Illustration</li>
                    <li onClick={() => handleSelection('Web design')} className='mx-1 py-2 px-4 rounded-full cursor-pointer dark:text-white transition-[color] duration-[5s] ease-out hover:bg-[#E9E9E9] hover:dark:bg-[#c7c7c7] [@media(max-width:680px)]:px-3 [@media(max-width:680px)]:mx-0'>Web design</li>
                    <li onClick={() => handleSelection('Accessoires')} className='mx-1 py-2 px-4 rounded-full cursor-pointer dark:text-white transition-[color] duration-[5s] ease-out hover:bg-[#E9E9E9] hover:dark:bg-[#c7c7c7] [@media(max-width:680px)]:px-3 [@media(max-width:680px)]:mx-0'>Accessoirs</li>
                    <li onClick={() => handleSelection('Typographie')} className='mx-1 py-2 px-4 rounded-full cursor-pointer dark:text-white transition-[color] duration-[5s] ease-out hover:bg-[#E9E9E9] hover:dark:bg-[#c7c7c7] [@media(max-width:680px)]:px-3 [@media(max-width:680px)]:mx-0'>Typographie</li>
                    <li onClick={() => handleSelection('Manga')} className='mx-1 py-2 px-4 rounded-full cursor-pointer dark:text-white transition-[color] duration-[5s] ease-out hover:bg-[#E9E9E9] hover:dark:bg-[#c7c7c7]'>Manga</li>
                </ul>
            </div>
        </nav>

        <GetImg images={img}/>

        <div className='flex justify-center items-center py-12 dark:bg-black dark:text-white'>
        {page > 1 && (<button className='mx-4 flex justify-center items-center bg-[#77B0AA] rounded-lg p-4 hover:dark:bg-[#94dbd4]' onClick={() => setPage(page - 1)}><ion-icon name="chevron-back-outline"></ion-icon>Précedant</button>)}
        {page < totalPages && (<button className='mx-4 flex justify-center items-center bg-[#77B0AA] rounded-lg p-4 hover:dark:bg-[#94dbd4]' onClick={() => setPage(page + 1)}>Suivant<ion-icon name="chevron-forward-outline"></ion-icon></button>)}
        </div>
    </>
  )

}

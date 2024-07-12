import React, { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { BiSearch } from 'react-icons/bi';
import { FaBars, FaStar } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import useFetchData from '@/hooks/useFetchData';
import Cookies from 'js-cookie';
import Router from 'next/router';

export default function Header() {
    const router = useRouter();
    const [clicked, setClicked] = useState(false);
    const [navbar, setNavbar] = useState(false);
    const [searchBar, setSearchBar] = useState(false);
    const [activeLink, setActiveLink] = useState('/');
    const [movieShortname, setMovieShortname] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [username, setUsername] = useState('');

    const { allData, loading } = useFetchData(`/api/getmovies`);

    const publishedData = allData.filter(movie => movie.status === "publish");

    useEffect(() => {
        if (!movieShortname.trim()) {
            setSearchResult([]);
            return;
        }

        const filteredMovies = publishedData.filter(movie =>
            movie.title.toLowerCase().includes(movieShortname.toLowerCase())
        );

        setSearchResult(filteredMovies);
    }, [movieShortname]);

    const searchRef = useRef(null);

    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setMovieShortname('');
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector('nav');
            header.classList.toggle("sticky", window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        setActiveLink(router.pathname);
    }, [router.pathname]);

    useEffect(() => {
        const token = Cookies.get('token');

        if (token) {
            axios.post('/api/decodeToken', null, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                const { user } = response.data;
                setUsername(user.username); // Set username state when token is decoded successfully
            })
            .catch(error => {
                console.error('Decode Token Error:', error);
                setUsername(''); // Reset username state if token decoding fails
            });
        } else {
            setUsername(''); // Reset username state if no token is found
        }
    }, []);

    const handleMovieClick = () => {
        setMovieShortname('');
    };

    const handleLinkClick = (link) => {
        setActiveLink(link);
        setClicked(false);
    };

    const handleNavbarOpen = () => {
        setNavbar(!navbar);
    };

    const handleNavbarClose = () => {
        setNavbar(false);
    };

    const handleSearchBarOpen = () => {
        setSearchBar(!searchBar);
    };

    const handleSearchBarClose = () => {
        setSearchBar(false);
        setMovieShortname('');
    };

    const handleLogout = () => {
        Cookies.remove('token', { path: '/' });
        Router.push('/');
    };

    return (
        <>
            <nav className="header">
                <h1 className="logo" data-text="&nbsp;Anime&nbsp;">
                    <Link href="/">&nbsp;Anime&nbsp;</Link>
                </h1>
                <form className={searchBar ? "search_bar active" : "search_bar"} ref={searchRef}>
                    <input
                        type="text"
                        placeholder="Search Movies..."
                        value={movieShortname}
                        onChange={(e) => setMovieShortname(e.target.value)}
                    />
                    <div className="searchclose" onClick={handleSearchBarClose}><IoClose /></div>
                    {movieShortname && (
                        <div className="search_results">
                            <h2>Search Result</h2>
                            <ul>
                                {searchResult.length > 0 ? (
                                    searchResult.slice(0, 20).map((movie) => (
                                        <Link key={movie._id} href={`/movies/${movie.slug}`}>
                                            <div onClick={handleMovieClick} className="moviesearchlist">
                                                <div>
                                                    <img src={movie.smPoster} alt="image" width={80} height={80} />
                                                </div>
                                                <div className="searchbarinfo">
                                                    <h5>{movie.title}</h5>
                                                    <h4>Rating: <FaStar /><span>{movie.rating}</span></h4>
                                                    <h4>Release Year: {movie.year}</h4>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p>No Movie Found</p>
                                )}
                            </ul>
                        </div>
                    )}
                </form>

                <div id={navbar ? "navbaractive" : "navbar"}>
                    <div className="navlogomovie">
                        <h1 className="logo" data-text="&nbsp;Anime&nbsp;">
                            <Link href="/">&nbsp;Anime&nbsp;</Link>
                        </h1>
                        <div className="navclosesvg" onClick={handleNavbarClose}>
                            <IoClose />
                        </div>
                    </div>
                    <ul className={clicked ? "navbar active" : "navbar"} onClick={handleNavbarClose}>
                        <li>
                            <Link href="/" className={activeLink === '/' ? 'active' : ''} onClick={() => handleLinkClick('/')}>Home</Link>
                        </li>
                        <li>
                            <Link href="/movies" className={activeLink === '/movies' ? 'active' : ''} onClick={() => handleLinkClick('/movies')}>Movies</Link>
                        </li>
                        <li>
                            <Link href="/year" className={activeLink === '/year' ? 'active' : ''} onClick={() => handleLinkClick('/year')}>Year</Link>
                        </li>
                        <li>
                            <Link href="/category" className={activeLink === '/category' ? 'active' : ''} onClick={() => handleLinkClick('/category')}>Category</Link>
                        </li>
                        <li>
                            <Link href="/genre" className={activeLink === '/genre' ? 'active' : ''} onClick={() => handleLinkClick('/genre')}>Genre</Link>
                        </li>
                        {!Cookies.get('token') ? (
                            <li>
                                <Link href="/login" className={router.pathname === '/login' ? 'active' : ''}>
                                    Sign In
                                </Link>
                            </li>
                        ) : (
                            <li>
                                <a onClick={handleLogout}>Logout ({username})</a>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="mobile">
                    <BiSearch className="opensearchsvg" onClick={handleSearchBarOpen} />
                    <FaBars onClick={handleNavbarOpen} />
                </div>
            </nav>
        </>
    );
}

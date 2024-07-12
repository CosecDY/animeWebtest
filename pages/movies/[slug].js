import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useFetchData from "@/hooks/useFetchData";
import { FaImdb, FaBookmark, FaCheck, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { FaHeart, FaEye, FaStar } from "react-icons/fa";

import { FaShareFromSquare } from "react-icons/fa6";
import { useState } from 'react';

export default function MoviesPost() {
    const router = useRouter();
    const { slug } = router.query;

    const { allData, loading } = useFetchData(slug ? `/api/getmovies?slug=${slug}` : null);
    const { allMovie } = useFetchData('/api/getmovies');

    const publishedData = allMovie?.filter(movie => movie.status === "publish");

    const [scrollPosition, setScrollPosition] = useState(0);

    const scrollLeft = () => {
        const scrollContainer = document.querySelector(".scrollcards");
        scrollContainer.scrollLeft -= 300;
    }

    const scrollRight = () => {
        const scrollContainer = document.querySelector(".scrollcards");
        scrollContainer.scrollLeft += 500;
    }

    const getYoutubeVideoId = (url) => {
        const urlObj = new URL(url);
        return urlObj.searchParams.get('v');
    }

    const youtubeLink = allData && allData[0]?.youtubeLink;
    const videoId = youtubeLink ? getYoutubeVideoId(youtubeLink) : null;



    return (
        <>
            <Head>
                <title>{slug ? slug.replaceAll('-', ' ') : 'Loading...'}</title>
            </Head>
            <div className="">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="slideimagebx">
                        <img src={allData && allData[0]?.bgPoster} alt="movie" loading='lazy' />
                    </div>
                )}
            </div>

            <div className="mainmoviebx">
                <div className="leftdata">
                    <div className="leftimgbx">
                        <img src={allData && allData[0]?.smPoster} alt="movie" loading='lazy' />
                        <div className="seenonly">
                            <div className="seenwatch">
                                <button><FaBookmark className="sebtn" />Watchlist</button>
                                <button><FaCheck className="sebtn" />Seen</button>
                                <button><FaThumbsUp className="sebtn" />Like</button>
                                <button><FaThumbsDown className="sebtn" />Dislike</button>
                            </div>
                            <a target='_blank' href={`${allData && allData[0]?.watchonline}`}><button className='watchmoviebtn'>Click to watch online</button></a>

                        </div>
                    </div>
                    <div className="rating">
                        <h3>RATTING</h3>
                        <div className="rate">
                            <FaImdb className="faImdb" />
                            <h4>{allData && allData[0]?.rating} <span>IMDB</span> </h4>
                        </div>
                    </div>
                    <div className="rating">
                        <h3>GENRE</h3>
                        <div className="rate">
                            <h4 className='uppercase'>{allData && allData[0]?.genre.join(', ')}</h4>
                        </div>
                    </div>
                    <div className="rating">
                        <h3>DURATION</h3>
                        <div className="rate">
                            <h4 className='uppercase'>{allData && allData[0]?.duration} </h4>
                        </div>
                    </div>
                    <div className="rating">
                        <h3>YEAR</h3>
                        <div className="rate">
                            <h4 className='uppercase'>{allData && allData[0]?.year} </h4>
                        </div>
                    </div>
                    <div className="rating">
                        <h3>QUALITY</h3>
                        <div className="rate">
                            <h4 className='uppercase'>{allData && allData[0]?.quality} </h4>
                        </div>
                    </div>
                </div>

                <div className="rightdata">
                    <div className="movietitle">
                        <h1>{allData && allData[0]?.slug.replaceAll('-', ' ')}</h1>
                        <button className='faShareFromSquare'><FaShareFromSquare /></button>
                    </div>
                    <p className="dpera">DOWNLOAD FREE NOW</p>
                    <div className="moviedescription">
                        <article className='movieinfo'>
                            <h3 className='uppercase'>{allData && allData[0]?.titleCategory} Name: </h3>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="uppercase">&#9642; {allData && allData[0]?.titleCategory}Name: </td>
                                        <td>{allData && allData[0]?.title}</td>
                                    </tr>
                                    <tr>
                                        <td>&#9642; Release Year: </td>
                                        <td>{allData && allData[0]?.year}</td>
                                    </tr>
                                    <tr>
                                        <td>&#9642; Genre Year: </td>
                                        <td>{allData && allData[0]?.genre.join(', ')}</td>
                                    </tr>
                                    <tr>
                                        <td>&#9642; Language: </td>
                                        <td>{allData && allData[0]?.language}</td>
                                    </tr>
                                    <tr>
                                        <td>&#9642; Subtitle: </td>
                                        <td>{allData && allData[0]?.subtitle}</td>
                                    </tr>
                                    <tr>
                                        <td>&#9642; Size: </td>
                                        <td>{allData && allData[0]?.size}</td>
                                    </tr>
                                    <tr>
                                        <td>&#9642; Quality: </td>
                                        <td>{allData && allData[0]?.quality}</td>
                                    </tr>
                                    <tr>
                                        <td>&#9642; Format: </td>
                                        <td>MKV</td>
                                    </tr>
                                </tbody>
                            </table>
                        </article>
                        <article>
                            <div className="storyline">
                                <h3>Story Line : </h3>
                                <p>{allData && allData[0]?.description}</p>
                            </div>
                        </article>
                        <section className='downloadsec'>


                        </section>
                        <div className="youtubeiframe">
                            <h3 id="movietrailer" className='uppercase'>{allData && allData[0]?.titleCategory} Trailer :</h3>
                            {videoId ? (
                                <iframe
                                    width="100%"
                                    height="370"
                                    src={`https://www.youtube.com/embed/${videoId}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title="YouTube video player"
                                ></iframe>
                            ) : (
                                <p>No trailer available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="raletedmovies">
                <h3>LATEST MOVIES :</h3>
                <div className="scrollcards">
                    {publishedData.slice(0, 12).map((movie) => (
                        <div className="card">
                            <Link href={`/movies/${movie.slug}`}>
                                <div className="cardimg">
                                    <img src={movie.smPoster} alt="movie" loading="lazy" />
                                </div>
                                <div className="contents">
                                    <h5>{movie.title}</h5>
                                    <h6>
                                        <span>{movie.year}</span>
                                        <div className="rate">
                                            <i className="cardfas"><FaHeart /></i>
                                            <i className="cardfas"><FaEye /></i>
                                            <i className="cardfas"><FaStar /></i>
                                            <h6>{movie.rating}</h6>
                                        </div>
                                    </h6>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="cardbuttons">
                    <button onClick={scrollLeft} className='cardleft'>&#8592;</button>
                    <button onClick={scrollRight} className='cardRight'>&#8594;</button>
                </div>
            </div>
        </>
    );
}

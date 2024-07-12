import Head from "next/head";
import Header from "@/components/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "@/components/Loader";
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import useFetchData from "@/hooks/useFetchData";
import { useState, useEffect } from "react";
import Link from 'next/link';

import { FaAngleDoubleUp, FaDownload, FaHeart, FaEye, FaStar, FaArrowRight } from "react-icons/fa";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const categories = ["bollywood", "hollywood", "south", "gujarati", "marvel_studio", "tv_shows", "web_series"];
const genres = ['All Movies','action', 'adventure', 'animation', 'comedy', 'drama', 'crime', 'fantasy', 'horror', 'romance', 'thriller', 'science_fiction'];

const GenreButton = ({ genre, selectedGenre, handleGenreClick }) => (
  <button
    className={selectedGenre === genre ? 'active' : ''}
    onClick={() => handleGenreClick(genre)}
  >
    {genre}
  </button>
);

export default function Home() {
  const { allData, loading } = useFetchData('/api/getmovies');
  const [selectedGenre, setSelectGenre] = useState('All Movies');

  const publishedData = allData.filter(ab => ab.status === "publish");

  const filteredData = publishedData.filter(movie => {
    if (selectedGenre === 'All Movies') return true;
    if (categories.includes(selectedGenre)) {
      return movie.category === selectedGenre;
    } else {
      return movie.genre.includes(selectedGenre);
    }
  });

  const handleGenreClick = (genre) => {
    setSelectGenre(genre);
  };

  return (
    <>
      <Head>
        <title>Movie App</title>
        <meta name="description" content="Next Js Movie App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="swiper_top_main">
          <Swiper
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            direction="horizontal"
            loop={true}
            speed={1200}
            parallax={true}
            scrollbar={{ draggable: true }}
            modules={[Pagination, Navigation, Autoplay]}
          >
            {loading ? <div className="slideimagebx flex flex-center"><Loader /></div> :
              publishedData.slice(0, 4).map((movie) => (
                <SwiperSlide key={movie._id}>
                  <div className="slideimagebx">
                    <img src={movie.bgPoster} alt="movie" loading="lazy" />
                    <div className="content" key={movie._id}>
                      <div className="contentflex">
                        <div className="smalimg">
                          <img src={movie.smPoster} alt="movie" loading="lazy" />
                        </div>
                        <div className="movieconte">
                          <h1 id="header_gen">{movie.title}</h1>
                          <h6>Duration: <span id="header_dur">{movie.duration}</span></h6>
                          <h3 id="header_gen">
                            <span className="star">&#9733;</span>
                            {movie.rating}
                            <span>{movie.genre.join(', ')}</span>
                          </h3>
                          <div className="btns">
                            <Link href={`/movies/${movie.slug}`}>
                              <button className="btn_download">
                                <FaDownload className="faDownload" />DOWNLOAD
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            }

            <div className="swiper-pagination"></div>
            <div className="swiper-scrollbar"></div>
          </Swiper>
        </div>

        <div className="tranding_bx">
          <li><Link href="movies" className="active"><i><FaAngleDoubleUp className="fas" /></i>Latest</Link></li>
        </div>

        <div className="scrollcardssec">
        <Swiper
          slidesPerView={8}
          spaceBetween={10}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          direction="horizontal"
          loop={true}
          speed={1200}
          watchSlidesProgress={true}
          modules={[Pagination, Navigation, Autoplay]}
          breakpoints={{
            1587: {
              slidesPerView: 8,
              spaceBetween: 10,
            },
            1500: {
              slidesPerView: 7,
              spaceBetween: 10,
            },
            1200: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
            1040: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            990: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            650: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            400: {
              slidesPerView: 2,
              spaceBetween: 10,
            },

          }}
        >
          {loading ? (
            <div className="swiper-loader flex flex-center h-15vh">
              <Loader />
            </div>
          ) : (
            publishedData.map((movie) => (
              <SwiperSlide key={movie._id}>
                <div className="scrollcards">
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

              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>



        <div className="tranding_bx" style={{ marginTop: '40px' }}>
          <li><Link href="movies" className="active"><i><FaAngleDoubleUp className="fas" /></i>Latest</Link></li>
        </div>

        <div className="moviestegs">
          {[...genres, ...categories].slice(0, 16).map(item => (
            <GenreButton
              key={item}
              genre={item}
              selectedGenre={selectedGenre}
              handleGenreClick={handleGenreClick}
            />
          ))}
        </div>

        <div className="moviescontainer">
          {loading ? <div className="scrollcandssec flex flex-center h-15vh"><Loader /></div> :
            filteredData.length === 0 ? <p className="nodatafound">No Movie Found</p> :
              filteredData.map((movie) => (
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
              ))
          }
        </div>

        <div className="nextpagelink">
          <Link href='/movies'>
            <button className="cssbuttons_io_button">Next Page
              <div className="icon">
                  <FaArrowRight/>
              </div>
              </button>
          </Link>
        </div>
      </div>
    </>
  );
}

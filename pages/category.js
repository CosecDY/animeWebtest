import Head from "next/head";
import Spinner from "@/components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper';
import Link from 'next/link';
import { FaHeart, FaEye, FaStar } from "react-icons/fa";
import useFetchData from "@/hooks/useFetchData";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Initialize Swiper modules
SwiperCore.use([Pagination, Navigation, Autoplay]);

export default function Category() {
    const { allData, loading } = useFetchData('/api/getmovies');

    // Filter and sort movies by category
    const publishedData = allData.filter(movie => movie.status === 'publish');
    const moviesData = publishedData.filter(movie => movie.titleCategory === 'movies');

    // Group movies by category and sort categories alphabetically
    const moviesByCategory = moviesData.reduce((acc, movie) => {
        const category = movie.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(movie);
        return acc;
    }, {});

    const sortedCategories = Object.keys(moviesByCategory).sort(); // Sort categories alphabetically

    return (
        <>
            <Head>
                <title>Category</title>
                <meta name="description" content="All the movies" />
            </Head>
            <section className="genremoviesec">
                <div className="genrename">
                    <h1 style={{ color: 'white' }}>Category</h1>
                    <p>Hello World</p>
                </div>
            </section>

            {/* Display movies by category */}
            {loading ? (
                <Spinner />
            ) : (
                sortedCategories.map(category => (
                    <section key={category} className="genremoviesec">
                        <h2 style={{ color: 'white' }}>{category}</h2>
                        <div className="genremovie">
                            {moviesByCategory[category].map(movie => (
                                <div className="card" key={movie.id}>
                                    <Link href={`/movies/${movie.slug}`}>
                                        <div className="cardimg">
                                            <img src={movie.smPoster} alt="movie" loading="lazy" />
                                        </div>
                                        <div className="contents">
                                            <h5>{movie.title}</h5>
                                            <h6>
                                                <span>{new Date(movie.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
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
                    </section>
                ))
            )}
        </>
    );
}

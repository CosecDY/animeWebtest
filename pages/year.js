import Head from "next/head";
import Spinner from "@/components/Spinner";
import Link from 'next/link';
import { FaHeart, FaEye, FaStar } from "react-icons/fa";
import useFetchData from "@/hooks/useFetchData";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Year() {
    const { allData, loading } = useFetchData('/api/getmovies');

    // Filter and sort movies by status
    const publishedData = allData.filter(movie => movie.status === 'publish');

    // Group movies by year and sort by year in descending order
    const moviesByYear = publishedData.reduce((acc, movie) => {
        const year = movie.year; 
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(movie);
        return acc;
    }, {});

    const sortedYears = Object.keys(moviesByYear).sort((a, b) => b - a); // Sort years in descending order

    return (
        <>
            <Head>
                <title>Year</title>
                <meta name="description" content="All the movies organized by year" />
            </Head>
            <section className="genremoviesec">
                <div className="genrename">
                    <h1 style={{ color: 'white' }}>Year</h1>
                    <p>Hello World</p>
                </div>
            </section>

            {/* Display movies by year */}
            {loading ? (
                <Spinner />
            ) : (
                sortedYears.map(year => (
                    <section key={year} className="genremoviesec">
                        <h2 style={{ color: 'white' }}>{year}</h2>
                        <div className="genremovie">
                            {moviesByYear[year].map(movie => (
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

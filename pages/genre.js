import Head from "next/head";
import Spinner from "@/components/Spinner";
import Link from 'next/link';
import { FaHeart, FaEye, FaStar } from "react-icons/fa";
import useFetchData from "@/hooks/useFetchData";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function All() {
    const { allData, loading } = useFetchData('/api/getmovies');

    // Filter and sort movies by category
    const publishedData = allData.filter(movie => movie.status === 'publish');
    const moviesData = publishedData.filter(movie => movie.titleCategory === 'movies');

    // Group movies by genre and sort by genre
    const moviesByGenre = moviesData.reduce((acc, movie) => {
        movie.genre.forEach(genre => {
            if (!acc[genre]) {
                acc[genre] = [];
            }
            acc[genre].push(movie);
        });
        return acc;
    }, {});

    const sortedGenres = Object.keys(moviesByGenre).sort(); // Sort genres alphabetically

    return (
        <>
            <Head>
                <title>Genre</title>
                <meta name="description" content="All the movies" />
            </Head>
            <section className="genremoviesec">
                <div className="genrename">
                    <h1 style={{ color: 'white' }}>Genre</h1>
                    <p>Hello World</p>
                </div>
            </section>

            {/* Display movies by genre */}
            {loading ? (
                <Spinner />
            ) : (
                sortedGenres.map(genre => (
                    <section key={genre} className="genremoviesec">
                        <h2 style={{ color: 'white' }}>{genre}</h2>
                        <div className="genremovie">
                            {moviesByGenre[genre].map(movie => (
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

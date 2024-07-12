import Head from "next/head";
import Spinner from "@/components/Spinner";
import Link from 'next/link';
import { FaHeart, FaEye, FaStar } from "react-icons/fa";
import useFetchData from "@/hooks/useFetchData";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Movies() {
    const { allData, loading } = useFetchData('/api/getmovies');

    // Filter and sort movies by status and category
    const publishedData = allData.filter(movie => movie.status === 'publish' && movie.titleCategory === 'movies');

    return (
        <>
            <Head>
                <title>All Movies</title>
                <meta name="description" content="All the movies" />
            </Head>
            <section className="genremoviesec">
                <div className="genrename">
                    <h1 style={{ color: 'white' }}>All Movies</h1>
                    <p>Hello World</p>
                </div>
            </section>

            <section className="genremoviesec">
                <div className="genremovie">
                    {loading ? <Spinner /> : 
                    <>
                        {publishedData.map((movie) => (
                            <div className="card" key={movie.id}>
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
                    </>
                    }
                </div>
            </section>
        </>
    );
}

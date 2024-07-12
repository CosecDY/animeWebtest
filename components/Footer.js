import Link from "next/link"

const Footer = () => {
    return (
        <>
            <footer className='footer'>
                <div className="m-auto footersec">
                    <div className="fcontent">
                        <div className="flogo">
                            <h1><Link href="/">Anime</Link></h1>
                        </div>
                        <div className="quicklink">
                            <li><Link href='/'>Home</Link></li>
                            <li><Link href='/movies'>All movies</Link></li>
                            <li><Link href='/year'>Year</Link></li>
                            <li><Link href='/category'>Category</Link></li>
                            <li><Link href='/genre'>Genre</Link></li>
                        
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
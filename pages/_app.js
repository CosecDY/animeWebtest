import '../styles/globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';
  const show = !(isLoginPage);

  return (
    <main>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </main>
  );
}

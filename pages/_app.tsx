import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NProgress from 'nprogress';
import '../styles/nprogress.css';
import '../styles/globals.css';
import 'assets/template/App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
import PageLoader from 'components/PageLoader';
import Script from 'next/script';
import config from 'utils/config';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      NProgress.start();
      setLoading(true);
    };
    const handleStop = () => {
      NProgress.done();
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);
  const { city, state, living_type, slug } = router.query;
  return <>{loading ? <PageLoader /> : (<>
    {config.DEPLOYMENT === 'prod' ?
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PLXWRW3');
      `}
      </Script> : null
    }

    {config.DEPLOYMENT === 'prod' ?
      <>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=UA-156857230-1" />
        <Script id="gtag">
          {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments)};
        gtag('js', new Date());
        ${slug ? `gtag('set', {'content_group3': 'Property page'});` : city ? `gtag('set', {'content_group1': 'City Page'});` : state ? `gtag('set', {'content_group2': 'State Page'});` : living_type ? `gtag('set', {'content_group4': 'Pillar Page'});` : ''}  

        gtag('config', 'UA-156857230-1');
        `}

        </Script>
      </>
      : null}


    <Component {...pageProps} />
  </>)}</>;
}

export default MyApp;

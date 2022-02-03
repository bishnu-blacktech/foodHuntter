import type { AppProps } from 'next/app';
import { Router, useRouter } from 'next/router';
import { ManagedUIContext } from '@contexts/ui.context';
import ManagedModal from '@components/common/modal/managed-modal';
import ManagedDrawer from '@components/common/drawer/managed-drawer';
import { useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from 'react-query/devtools';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from '@components/seo/default-seo';
import ProgressBar from '@badrap/bar-of-progress';

// external
import 'react-toastify/dist/ReactToastify.css';

// base css file
import '@styles/scrollbar.css';
import '@styles/swiper-carousel.css';
import '@styles/custom-plugins.css';
import '@styles/tailwind.css';
import { getDirection } from '@utils/get-direction';
import { ThemeProvider } from 'next-themes';
import { delay } from 'lodash';

const Noop: React.FC = ({ children }) => <>{children}</>;

const progress = new ProgressBar({
  size: 4,
  color: 'red',
  className: 'zIndex-50',
  delay: 100,
});

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useRef<any>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  const router = useRouter();
  const dir = getDirection(router.locale);
  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);
  const Layout = (Component as any).Layout || Noop;

  Router.events.on('routeChangeStart', progress.start);
  Router.events.on('routeChangeComplete', progress.finish);
  Router.events.on('routeChangeError', progress.finish);

  return (
    <ThemeProvider defaultTheme="dark" themes={['dark']} attribute="class">
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <ManagedUIContext>
            <>
              <DefaultSeo />
              <Layout pageProps={pageProps}>
                <Component {...pageProps} key={router.route} />
              </Layout>
              <ToastContainer />
              <ManagedModal />
              <ManagedDrawer />
            </>
          </ManagedUIContext>
        </Hydrate>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default appWithTranslation(CustomApp);

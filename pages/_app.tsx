
import Layout from '@/app/components/Layout';
import store from '@/app/store/store';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;

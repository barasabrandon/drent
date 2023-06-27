import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';
import store from '../store/index';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </SessionProvider>
  );
}

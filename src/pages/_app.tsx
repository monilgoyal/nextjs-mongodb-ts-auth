import '../styles/globals.css'
import type { AppProps } from 'next/app'

// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

// export default MyApp
import React from "react";
import { QueryClient, QueryClientProvider, } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}
import { ListProvider } from "@/contexts/ListProvider";
import { PageProvider } from "@/contexts/PageProvider";
import type { AppProps } from "next/app";

import '../styles/globals.css';
import '../styles/customImage.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PageProvider>
      <ListProvider>
        <Component {...pageProps} />
      </ListProvider>
    </PageProvider>
  );
}

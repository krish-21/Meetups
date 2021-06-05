import "../styles/globals.css";

import Layout from "../components/layout/Layout";

// root component rendered by NextJS
// Component - page content
// pageProps - specific props for page
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

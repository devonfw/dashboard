import ResponsiveDrawer from '../components/ResponsiveDrawer/ResponsiveDrawer';
import Head from 'next/head';

const Layout = (props: { children: any }) => (
  <div>
    <Head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <title>devonfw dashboard</title>
    </Head>
    
    <ResponsiveDrawer>{props.children}</ResponsiveDrawer>
  </div>
);

export default Layout
import Head from 'next/head';

const Layout = (props: { children: JSX.Element }): JSX.Element => (
  <div>
    <Head>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <title>devonfw dashboard</title>
    </Head>

    {props.children}
  </div>
);

export default Layout;

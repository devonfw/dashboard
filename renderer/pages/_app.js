import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import { StepperProvider } from '../modules/projects/redux/stepperContext';
import { CreatorProvider } from '../modules/shared/redux/installer/creator';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../styles/theme';

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>My page</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <StepperProvider>
            <CreatorProvider>
              <Component {...pageProps} />
            </CreatorProvider>
          </StepperProvider>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

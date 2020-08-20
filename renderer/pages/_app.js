/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import { StepperProvider } from '../modules/projects/redux/stepper/stepperContext';
import { CreatorProvider } from '../modules/projects/redux/creator/creator';
import { InstallerProvider } from '../modules/projects/redux/installer/installer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '../modules/shared/components/drawer/drawer';
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
          <title>devonfw dashboard</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <StepperProvider>
            <Drawer>
              <InstallerProvider>
                <CreatorProvider>
                  <Component {...pageProps} />
                </CreatorProvider>
              </InstallerProvider>
            </Drawer>
          </StepperProvider>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

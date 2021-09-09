import React from 'react';
import styles from './App.module.css';
import './index.css';
import { Layout, Menu, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { Routes } from './components/Routes';
import Logo from './assets/logo.png';
import { OpenNotification } from './services/helpers/helpers';
import { connect } from 'react-redux';
import { RootState } from './domain/rootReducer';
import {
  setUserInfo as setSettingsAction,
  resetUserInfo as resetSettingsAction,
  setGoogleToken as setGoogleTokenAction,
  resetGoogleToken as resetGoogleTokenAction,
  setAnalyses as setAnalysesAction,
} from './domain/settings/slice';

const mapDispatch = {
  setUserInfo: setSettingsAction,
  resetUserInfo: resetSettingsAction,
  setAnalyses: setAnalysesAction,
  setGoogleToken: setGoogleTokenAction,
  resetGoogleToken: resetGoogleTokenAction,
} as const;
const mapState = ({ settings }: RootState) => ({ settings } as const);

type Props = ReturnType<typeof mapState> & typeof mapDispatch;

const { Header, Content, Footer } = Layout;
export const AppComponent = ({
  setUserInfo,
  resetUserInfo,
  setGoogleToken,
  resetGoogleToken,
}: Props) => {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  const onLoginSuccess = (response: any) => {
    setUserInfo(response.profileObj);
    setGoogleToken(response.tokenId);
    setIsLoaded(true);
  };

  const onLogoutSuccess = () => {
    resetUserInfo();
    resetGoogleToken();
    setIsLoaded(true);
  };

  const onAutoLoadFinished = () => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  };
  const onLoginFailure = () => {
    resetUserInfo();
    resetGoogleToken();
    setIsLoaded(true);
    OpenNotification({
      type: 'error',
      message: 'Could not login',
      description: 'Something went wrong',
    });
  };
  return (
    <div className="app">
      <Layout className={styles.layout}>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <img className={styles.logo} src={Logo} alt={'Small CG logo'} />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['home']}
            selectedKeys={[useLocation().pathname]}
          >
            <Menu.Item key="/">
              <Link to="/">
                <span>Home</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/batches">
              <Link to="/batches">
                <span>Batches</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/latest">
              <Link to="/latest">
                <span>Latest updates</span>
              </Link>
            </Menu.Item>
          </Menu>
          <div></div>
          <div className={styles.googleButton}>
            <Button
              type="primary"
              onClick={() => window.alert('Login not avaiable yet')}
            >
              Login
            </Button>
          </div>
        </Header>
        <Content
          className={styles.siteLayout}
          style={{ padding: '0 50px', marginTop: 64 }}
        >
          <div
            className={styles.siteLayoutBackground}
            style={{ padding: 24, minHeight: 380 }}
          >
            <Routes isLoggedIn={true} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Clinical Genomics ©2020</Footer>
      </Layout>
    </div>
  );
};

export const App = connect(mapState, mapDispatch)(AppComponent);

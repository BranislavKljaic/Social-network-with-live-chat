import React from 'react';
import { Link } from 'react-router-dom';
import Page from '../Page';
import RootStyle from './style';

const NotFoundPage = () => (
  <Page>
    <RootStyle>
      <p>
        This is not the page that you are looking for!
        <br />
        <Link to="/">Go Home</Link>
      </p>
    </RootStyle>
  </Page>
);

export default NotFoundPage;

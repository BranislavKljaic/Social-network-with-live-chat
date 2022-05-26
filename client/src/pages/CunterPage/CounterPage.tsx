import React, { FC } from 'react';
import Page from '../Page';
import CounterScreen from '../../features/counter/CounterScreen';

interface PageTestProps {
  test?: string;
}

const CounterPage: FC<PageTestProps> = () => (
  <Page>
    <CounterScreen />
  </Page>
);

export default CounterPage;

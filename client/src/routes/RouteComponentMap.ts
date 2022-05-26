import { FC } from 'react';
import { COUNTER_PATH } from './path-constants';
import CounterScreen from '../features/counter/CounterScreen';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

interface IPathComponent {
  path?: string;
  component: FC;
}

const pathComponentArray: IPathComponent[] = [];

pathComponentArray.push({ path: COUNTER_PATH, component: CounterScreen });
pathComponentArray.push({ component: NotFoundPage });

export { pathComponentArray };
export default {};

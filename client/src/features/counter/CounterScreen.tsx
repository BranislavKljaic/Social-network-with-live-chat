import React from 'react';
import {
  decrement,
  incrementByAmount,
  selectCount,
  selectCountWithMessage,
} from './counterSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { CustomButtonOld } from '../../components/buttons';

const CounterScreen = () => {
  const count = useAppSelector(selectCount);
  const countMessage = useAppSelector(selectCountWithMessage);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <CustomButtonOld onClick={() => dispatch(incrementByAmount(10))}>
          Submit
        </CustomButtonOld>
        <button
          type="button"
          aria-label="Increment value"
          onClick={() => dispatch(incrementByAmount(10))}
        >
          Increment
        </button>
        <span>{count}</span>
        <span>{countMessage}</span>
        <button
          type="button"
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default CounterScreen;

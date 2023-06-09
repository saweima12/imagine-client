import { SetStateAction } from 'react';

export const createStore = <T>(initialState: T) => {
  let state: T = initialState;
  const listeners: Set<any> = new Set();

  const getState = () => state;
  const setState = (fn: SetStateAction<T>) => {
    if (typeof fn === 'function') {
      const updateFn = fn as (prevState: T) => T;
      state = updateFn(state);
    } else {
      state = fn as T;
    }

    listeners.forEach((handler) => handler());
  };

  const subscribe = (handler: (value: T) => void) => {
    listeners.add(handler);
    return () => listeners.delete(handler);
  };

  const unSubscribe = (handler: unknown) => {
    listeners.delete(handler);
  };

  return {
    getState,
    setState,
    subscribe,
    unSubscribe,
  };
};

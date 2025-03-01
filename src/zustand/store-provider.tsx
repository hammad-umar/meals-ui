'use client';

import { useRef } from 'react';

import { initializeStore, Provider } from './store';

import type { PropsWithChildren } from 'react';
import type { StoreInterface, StoreType } from './store';

export type PreloadedStoreInterface = Pick<StoreInterface, 'isAuthenticated' | 'accessToken' | 'user'>;

export const StoreProvider = ({ children, ...props }: PropsWithChildren<PreloadedStoreInterface>) => {
  const storeRef = useRef<StoreType>(null);

  if (!storeRef.current) {
    storeRef.current = initializeStore(props);
  }

  return <Provider value={storeRef.current}>{children}</Provider>;
};

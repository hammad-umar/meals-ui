import { createContext, useContext } from 'react';
import { createStore, useStore as useZustandStore } from 'zustand';
import { persist } from 'zustand/middleware';

import { User } from '@/types';
import { PreloadedStoreInterface } from './store-provider';

export interface StoreInterface {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string;
  login: (accessToken: string, user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

const getDefaultInitialState = () => {
  return {
    user: null,
    accessToken: '',
    isAuthenticated: false,
  } as const;
};

export type StoreType = ReturnType<typeof initializeStore>;

const storeContext = createContext<StoreType | null>(null);

export const Provider = storeContext.Provider;

export const useStore = <T>(selector: (state: StoreInterface) => T) => {
  const store = useContext(storeContext);

  if (!store) {
    throw new Error('Store is missing the provider.');
  }

  return useZustandStore(store, selector);
};

export const initializeStore = (preloadedState: PreloadedStoreInterface) => {
  return createStore<StoreInterface>()(
    persist(
      (set) => ({
        ...getDefaultInitialState(),
        ...preloadedState,
        login: (accessToken: string, user: User) => set({ accessToken, user, isAuthenticated: true }),
        logout: () => set({ isAuthenticated: false, accessToken: '', user: null }),
        setUser: (user) => set({ user }),
      }),
      {
        name: 'store',
        partialize: (state) => ({
          isAuthenticated: state.isAuthenticated,
          user: state.user,
          accessToken: state.accessToken,
        }),
      }
    )
  );
};

export const store = initializeStore(getDefaultInitialState());

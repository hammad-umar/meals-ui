import { useShallow } from 'zustand/react/shallow';

import { StoreInterface, useStore } from '../store';

export const useAuth = (): StoreInterface => {
  return useStore(
    useShallow((store) => ({
      isAuthenticated: store.isAuthenticated,
      user: store.user,
      accessToken: store.accessToken,
      login: store.login,
      logout: store.logout,
      setUser: store.setUser,
    }))
  );
};

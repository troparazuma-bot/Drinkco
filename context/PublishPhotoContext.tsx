import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type PublishPhotoContextValue = {
  photoUri: string | null;
  setPhotoUri: (uri: string | null) => void;
};

const PublishPhotoContext = createContext<PublishPhotoContextValue | null>(null);

export function PublishPhotoProvider({ children }: { children: ReactNode }) {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const value = useMemo(() => ({ photoUri, setPhotoUri }), [photoUri]);
  return <PublishPhotoContext.Provider value={value}>{children}</PublishPhotoContext.Provider>;
}

export function usePublishPhoto(): PublishPhotoContextValue {
  const context = useContext(PublishPhotoContext);
  if (!context) throw new Error('usePublishPhoto must be used inside PublishPhotoProvider');
  return context;
}

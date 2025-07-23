import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type ApiKeyContextType = {
  apiKey: string | null;
  setApiKey: (key: string) => void;
  removeApiKey: () => void;
  hasApiKey: boolean;
  showApiKeyModal: boolean;
  setShowApiKeyModal: (show: boolean) => void;
  isLoading: boolean;
};

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

const API_KEY_STORAGE_KEY = 'coder-music-api-key';

export function ApiKeyProvider({ children }: { children: ReactNode }) {
  const [apiKey, setApiKeyState] = useState<string | null>(null);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setIsClient(true);
    setIsLoading(false);
  }, []);

  // Load API key from localStorage after client mount
  useEffect(() => {
    if (isClient) {
      try {
        const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
        if (storedKey) {
          setApiKeyState(storedKey);
        } else {
          // Show modal if no API key is found, but only after client is ready
          setTimeout(() => setShowApiKeyModal(true), 100);
        }
      } catch (error) {
        console.warn('Failed to load API key from localStorage:', error);
        setTimeout(() => setShowApiKeyModal(true), 100);
      }
    }
  }, [isClient]);

  const setApiKey = (key: string) => {
    if (isClient) {
      try {
        localStorage.setItem(API_KEY_STORAGE_KEY, key);
      } catch (error) {
        console.warn('Failed to save API key to localStorage:', error);
      }
    }
    setApiKeyState(key);
    setShowApiKeyModal(false);
  };

  const removeApiKey = () => {
    if (isClient) {
      try {
        localStorage.removeItem(API_KEY_STORAGE_KEY);
      } catch (error) {
        console.warn('Failed to remove API key from localStorage:', error);
      }
    }
    setApiKeyState(null);
    setShowApiKeyModal(true);
  };

  const hasApiKey = Boolean(apiKey && isClient);

  return (
    <ApiKeyContext.Provider
      value={{
        apiKey,
        setApiKey,
        removeApiKey,
        hasApiKey,
        showApiKeyModal: showApiKeyModal && isClient,
        setShowApiKeyModal,
        isLoading,
      }}
    >
      {children}
    </ApiKeyContext.Provider>
  );
}

export function useApiKey() {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error("useApiKey must be used within an ApiKeyProvider");
  }
  return context;
}

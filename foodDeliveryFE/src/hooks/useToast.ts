import { useState, useCallback, useRef } from 'react';

export interface UseToastReturn {
  toastMessage: string;
  isToastVisible: boolean;
  showToast: (message: string) => void;
}

export const useToast = (): UseToastReturn => {
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setToastMessage(message);
    setIsToastVisible(true);

    timerRef.current = setTimeout(() => {
      setIsToastVisible(false);
    }, 3000);
  }, []);

  return { toastMessage, isToastVisible, showToast };
};

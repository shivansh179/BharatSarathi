// lib/hooks/useLocalStorage.ts
'use client';

import { useState, useEffect } from 'react';

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const item = window.localStorage.getItem(key);
      if (item) setStoredValue(JSON.parse(item));
    } catch (error) {
      console.error('LocalStorage read error:', error);
    }
  }, [key]);

  useEffect(() => {
    if (!isMounted) return;
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue, isMounted]);

  return [storedValue, setStoredValue];
};

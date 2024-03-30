import { useState, useEffect } from 'react';

function useStorage<ItemType>(key: string) {
  const [item, setItem] = useState<ItemType | null>(null);

  const updateItem = (newItem: ItemType) => {
    localStorage.setItem(key, JSON.stringify(newItem));
    setItem(newItem);
  };

  const removeItem = () => {
    localStorage.removeItem(key);
    setItem(null);
  };

  useEffect(() => {
    const value = localStorage.getItem(key);
    if (value) {
      const item = JSON.parse(value);
      setItem(item);
    } else {
      setItem(null);
    }
  }, [key]);

  return { item, updateItem, removeItem };
}

export default useStorage;

import { WheelItemI } from '~/consts/consts';

const WHEEL_HISTORY_KEY = 'fortune_wheel_history';

export interface WheelHistory {
  wheelId: string;
  usedItemIds: number[];
  lastReset: string;
  lastSpinTime: string;
}

/**
 * Получить историю для конкретного колеса
 */
export const getWheelHistory = (wheelId: string): WheelHistory => {
  try {
    const saved = localStorage.getItem(WHEEL_HISTORY_KEY);
    const allHistory: Record<string, WheelHistory> = saved ? JSON.parse(saved) : {};
    
    if (!allHistory[wheelId]) {
      allHistory[wheelId] = {
        wheelId,
        usedItemIds: [],
        lastReset: new Date().toISOString(),
        lastSpinTime: new Date().toISOString()
      };
      localStorage.setItem(WHEEL_HISTORY_KEY, JSON.stringify(allHistory));
    }
    
    return allHistory[wheelId];
  } catch (error) {
    console.error('Error reading wheel history:', error);
    return {
      wheelId,
      usedItemIds: [],
      lastReset: new Date().toISOString(),
      lastSpinTime: new Date().toISOString()
    };
  }
};

/**
 * Сохранить историю колеса
 */
export const saveWheelHistory = (wheelId: string, history: WheelHistory): void => {
  try {
    const saved = localStorage.getItem(WHEEL_HISTORY_KEY);
    const allHistory: Record<string, WheelHistory> = saved ? JSON.parse(saved) : {};
    allHistory[wheelId] = history;
    localStorage.setItem(WHEEL_HISTORY_KEY, JSON.stringify(allHistory));
  } catch (error) {
    console.error('Error saving wheel history:', error);
  }
};

/**
 * Добавить выпавшее задание в историю конкретного колеса
 */
export const addUsedItem = (wheelId: string, itemId: number): void => {
  const history = getWheelHistory(wheelId);
  
  if (!history.usedItemIds.includes(itemId)) {
    history.usedItemIds.push(itemId);
    history.lastSpinTime = new Date().toISOString();
    saveWheelHistory(wheelId, history);
  }
};

/**
 * Получить случайное задание, которое ЕЩЕ НЕ ВЫПАДАЛО в этом колесе
 */
export const getRandomUnusedItem = (
  wheelId: string, 
  allItems: WheelItemI[]
): WheelItemI => {
  const history = getWheelHistory(wheelId);
  
  // Если все задания уже использовались в ЭТОМ колесе - сбрасываем историю
  if (history.usedItemIds.length >= allItems.length) {
    resetWheelHistory(wheelId);
    const randomIndex = Math.floor(Math.random() * allItems.length);
    return allItems[randomIndex];
  }
  
  // Фильтруем еще не использованные в ЭТОМ колесе задания
  const unusedItems = allItems.filter(item => !history.usedItemIds.includes(item.id));
  
  // Выбираем случайное из неиспользованных в ЭТОМ колесе
  const randomIndex = Math.floor(Math.random() * unusedItems.length);
  return unusedItems[randomIndex];
};

/**
 * Сбросить историю для конкретного колеса
 */
export const resetWheelHistory = (wheelId: string): void => {
  const history: WheelHistory = {
    wheelId,
    usedItemIds: [],
    lastReset: new Date().toISOString(),
    lastSpinTime: new Date().toISOString()
  };
  saveWheelHistory(wheelId, history);
};

/**
 * Получить статистику по конкретному колесу (независимую от других)
 */
export const getWheelStats = (wheelId: string, allItems: WheelItemI[]) => {
  const history = getWheelHistory(wheelId);
  
  const totalItems = allItems.length;
  const usedItems = history.usedItemIds.length;
  const availableItems = totalItems - usedItems;
  const completionPercentage = totalItems > 0 ? Math.round((usedItems / totalItems) * 100) : 0;
  
  return {
    totalItems,
    usedItems,
    availableItems,
    completionPercentage,
    lastReset: history.lastReset,
    needReset: usedItems >= totalItems
  };
};

/**
 * Проверить, было ли задание уже использовано в этом колесе
 */
export const isItemUsed = (wheelId: string, itemId: number): boolean => {
  const history = getWheelHistory(wheelId);
  return history.usedItemIds.includes(itemId);
};
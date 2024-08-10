export const storeData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error storing data in localStorage: ${error}`);
  }
};

export const getData = (key) => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch (error) {
    console.error(`Error retrieving data from localStorage: ${error}`);
    return null;
  }
};

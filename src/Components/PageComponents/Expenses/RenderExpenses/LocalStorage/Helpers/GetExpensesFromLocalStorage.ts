const getExpensesFromLocalStorage = () => {
  const localStorageItemsLength = localStorage.length;
  const localStorageItems: [string, number][] = [];

  //gathers all key value pairs form local storage and puts them into => localStorageItems
  for (let i = 0; i < localStorageItemsLength; i++) {
    const thisItemKey = localStorage.key(i);
    if (thisItemKey == null) {
      break;
    }
    const thisItemValue = localStorage.getItem(thisItemKey);
    if (thisItemValue == null) {
      break;
    }
    localStorageItems.push([thisItemKey, parseInt(thisItemValue)]);
  }

  //filters local storage key value pairs for items marked with "EXP-" in the key.
  const expenseItems: [string, number][] = localStorageItems.filter(
    (localStorageItem) => {
      const thisKey = localStorageItem[0];
      if (thisKey.includes("EXP-")) {
        return true;
      } else {
        return false;
      }
    }
  );

  return expenseItems;
};

export default getExpensesFromLocalStorage;

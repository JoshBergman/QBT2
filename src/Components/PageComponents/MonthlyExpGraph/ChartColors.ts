export const getColor = (index: number): string => {
  const colors = ["red", "green", "blue", "pink", "yellow"];

  if (index > colors.length - 1) {
    return "gray";
  }

  return colors[index];
};

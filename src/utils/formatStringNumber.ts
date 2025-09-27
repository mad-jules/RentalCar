export const formatNumberString = (str: string): string => {
  if (!str) {
    return "";
  }

  const [integerPart, decimalPart] = str.split(".");

  const formattedInt = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return decimalPart !== undefined
    ? `${formattedInt}.${decimalPart}`
    : formattedInt;
};

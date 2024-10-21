export const formatPercentage = (percent: string) => {
  const num = parseFloat(percent);
  return isNaN(num) ? "N/A" : `${num.toFixed(2)}%`;
};

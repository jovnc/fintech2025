export function convertDropsToXRP(drops: bigint) {
  return (Number(drops) / 10 ** 18).toFixed(2);
}

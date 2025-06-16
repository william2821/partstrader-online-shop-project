import { Locator } from '@playwright/test';

export async function getIndexFromProductsList(
  rowLst: Locator,
  targetProduct: string
) {
  const l = await rowLst.count();
  let index = 0;
  for (let i = 0; i < l; i++) {
    const product = await rowLst.nth(i).textContent();
    if (product?.trim()?.includes(targetProduct)) {
      index = i;
      break;
    }
  }
  return index;
}

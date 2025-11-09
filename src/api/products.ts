import { faker } from '@faker-js/faker';

import type { Product } from "../types/product";

export const fetchProducts = async (
  page = 1,
  limit = 20
): Promise<{ items: Product[]; hasMore: boolean }> => {
  const totalProducts = 10000;
  const start = (page - 1) * limit;
  const end = Math.min(start + limit, totalProducts);

  const items: Product[] = Array.from({ length: end - start }).map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    image: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
  }));

  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          items,
          hasMore: end < totalProducts,
        }),
      400
    )
  );
};

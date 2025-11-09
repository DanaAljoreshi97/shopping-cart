import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchProducts } from '../api/products';

export function useInfiniteProducts(limit = 20) {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam }) => fetchProducts(pageParam, limit),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
    initialPageParam: 1,
  });
}

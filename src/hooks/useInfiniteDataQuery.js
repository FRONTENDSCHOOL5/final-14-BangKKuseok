import { useInfiniteQuery } from 'react-query';

export default function useInfiniteDataQuery(queryKey, queryFn, config) {
  let accountname;

  if (typeof queryKey === 'object') {
    accountname = queryKey[1]?.accountname || queryKey[1];
  }

  const { data, fetchNextPage, isLoading, isFetching, hasNextPage } = useInfiniteQuery(
    queryKey,
    ({ pageParam = { skip: 0 } }) => {
      const queryParam = { accountname: accountname, skip: pageParam.skip };
      return queryFn(queryParam);
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length > 0 ? allPages.length * config.limit : 0;
        return lastPage.data.length < config.limit ? undefined : { skip: nextPage };
      },
      ...config,
    },
  );

  return { data, fetchNextPage, isLoading, isFetching, hasNextPage };
}

import { Post } from '@/types/posts';
import useSWR, { SWRConfiguration } from 'swr';

export const usePosts = (config?: SWRConfiguration) => {
  return useSWR<Post[]>(`/posts`, config);
};

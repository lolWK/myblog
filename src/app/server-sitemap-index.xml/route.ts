import { fetchPostIds } from './../../queries/post';
import { getServerSideSitemapIndex } from 'next-sitemap';

export async function GET() {
  const postIds = await fetchPostIds();

  const urls = postIds.map((post) => {
    return process.env.NEXT_PUBLIC_SITE_URL + `/post/${post.id}`;
  });

  return getServerSideSitemapIndex(urls);
}

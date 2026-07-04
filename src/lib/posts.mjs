import { getCollection } from 'astro:content';
import { SITE } from '../site.config.mjs';

export async function getPublishedPosts() {
  const posts = await getCollection('posts', ({ data }) => (import.meta.env.PROD ? !data.draft : true));
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Clusters que já têm pelo menos 1 post — só estes aparecem em menus/home (nada de seção vazia). */
export async function getActiveClusters() {
  const posts = await getPublishedPosts();
  return Object.entries(SITE.clusters)
    .filter(([slug]) => posts.some((p) => p.data.cluster === slug))
    .map(([slug, info]) => ({ slug, ...info }));
}

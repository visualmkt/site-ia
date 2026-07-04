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
    .map(([slug, info]) => ({ slug, ...info, count: posts.filter((p) => p.data.cluster === slug).length }));
}

/** "há 3 dias" / "há 2 meses" — estilo portal de conteúdo. */
export function timeAgo(date) {
  const diff = Math.max(0, Date.now() - new Date(date).getTime());
  const day = 86400000;
  const days = Math.floor(diff / day);
  if (days < 1) return 'hoje';
  if (days === 1) return 'há 1 dia';
  if (days < 30) return `há ${days} dias`;
  const months = Math.floor(days / 30);
  if (months < 12) return months === 1 ? 'há 1 mês' : `há ${months} meses`;
  const years = Math.floor(months / 12);
  return years === 1 ? 'há 1 ano' : `há ${years} anos`;
}

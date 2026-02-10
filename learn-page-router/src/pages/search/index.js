// src/pages/search/index.js
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();

  // 쿼리 스트링 꺼내기 (ex: /search?q=hello)
  const { q } = router.query;

  return <h1>Search: {q}</h1>;
}

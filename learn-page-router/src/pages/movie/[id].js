// src/pages/movie/[id].js
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();

  // URL 파라미터 꺼내기 (ex: /movie/123 -> id는 "123")
  const { id } = router.query;

  return <h1>Movie Detail: {id}</h1>;
}

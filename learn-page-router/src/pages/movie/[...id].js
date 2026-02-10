// src/pages/movie/[...id].js
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Movie Catch All</h1>
      <p>{JSON.stringify(id)}</p>
    </div>
  );
}

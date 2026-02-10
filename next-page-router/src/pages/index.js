import * as styles from '@/styles/home.css.js';
import SearchLayout from '@/components/layouts/SearchLayout';
import MovieItem from '@/components/MovieItem';
import { useEffect } from 'react';
import { fetchMovies, fetchNowPlayingMovies } from '@/lib/movie';

// 3️⃣ Props로 서버 데이터를 받음 (movies, data)
export default function Home({ nowPlaying, allMovies, data }) {
  // 5️⃣ Client Side에서만 실행 (Browser)
  useEffect(() => {
    // window, document 등은 여기서 안전하게 사용 가능
    console.log('Client Side Execution:', window.location.href);
  }, []);

  // 2️⃣, 4️⃣ Server & Client 모두 실행 (Hydration)
  console.log('Server & Client Execution:', data);

  return (
    <div className={styles.container}>
      <section>
        <h3>지금 상영중인 영화</h3>
        <div className={styles.list}>
          {nowPlaying.map((movie) => (
            <MovieItem key={`rec-${movie.id}`} {...movie} />
          ))}
        </div>
      </section>

      <section>
        <h3>등록된 모든 영화</h3>
        <div className={styles.list}>
          {allMovies.map((movie) => (
            <MovieItem key={`all-${movie.id}`} {...movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page) => {
  return <SearchLayout>{page}</SearchLayout>;
};

export const getServerSideProps = async (context) => {
  try {
    // 1️⃣ Server Side Execution (Server Only)
    console.log('Server Side Execution:', context.req.url);
    const [nowPlaying, allMovies] = await Promise.all([
      fetchNowPlayingMovies(),
      fetchMovies(),
    ]);

    const nowPlayingIds = nowPlaying.map((movie) => movie.id);
    const filteredMovies = allMovies.filter(
      (movie) => !nowPlayingIds.includes(movie.id),
    );
    const data = 'Next Cinema SSR Mode';

    return {
      props: {
        nowPlaying: nowPlaying.slice(0, 6), // 6개만
        allMovies: filteredMovies,
        data,
      },
    };
  } catch (error) {
    console.error('API Fetch Error:', error);
    return { notFound: true };
  }
};

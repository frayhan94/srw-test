import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Typography, Skeleton } from 'antd';
import { getMovie } from '../../features/movie/slice';
import { Layout } from '../../components';

const { Meta } = Card;
const { Title } = Typography;
const GENRE = JSON.parse(localStorage.getItem('GENRE')) || [];
function Home() {
  const dispatch = useDispatch();
  const movieState = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(getMovie());
  }, [dispatch]);

  if (movieState.loading) {
    return (
      <div className="px-3.5 py-4">
        <Skeleton />
      </div>
    );
  }

  return (
    <Layout header={false} footer>
      <div className="px-3.5 pt-4">
        {
          movieState?.data?.map((value, index) => (
            <div>
              <Title level={2}>
                {GENRE.length > 0 ? GENRE[index] : ''}
              </Title>
              <div style={{ display: 'flex', gap: '16px', overflowY: 'scroll', marginBottom: '24px' }}>
                {
                  value.results.map((valueResults) => (
                    <Card
                      hoverable
                      style={{ width: 240 }}
                      cover={<img style={{ height: '280px' }} alt="example" src={`https://image.tmdb.org/t/p/original/${valueResults.backdrop_path}`} />}
                    >
                      {/* eslint-disable-next-line max-len */}
                      <Meta title={valueResults?.original_title} />
                    </Card>
                  ))
                }
              </div>

            </div>
          ))
        }
      </div>
    </Layout>
  );
}

export default Home;

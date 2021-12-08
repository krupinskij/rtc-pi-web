import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { getCameras } from './queries';

const DashboardPage = () => {
  const { data } = useQuery('getCameras', getCameras, { enabled: true });

  useEffect(() => {
    console.log(data);
  }, [data]);
  return <div>DashboardPage</div>;
};

export default DashboardPage;

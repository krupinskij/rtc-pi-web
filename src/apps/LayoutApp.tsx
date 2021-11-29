import Layout from '../components/common/Layout';
import Navbar from '../components/common/Navbar';
import RouterApp from './RouterApp';

const LayoutApp = () => {
  return (
    <Layout>
      <Navbar />
      <RouterApp />
    </Layout>
  );
};

export default LayoutApp;

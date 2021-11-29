import Layout from '../components/common/Layout';
import Navbar from '../components/common/Navbar';

const LayoutApp: React.FC = ({ children }) => {
  return (
    <Layout>
      <Navbar />
      {children}
    </Layout>
  );
};

export default LayoutApp;

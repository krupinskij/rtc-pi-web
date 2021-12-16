import { useParams } from 'react-router-dom';

import ContentBody from 'components/common/ContentBody';
import { ContentWrapper } from 'components/common/styled';

const CameraPage = () => {
  const params = useParams();
  return (
    <>
      <ContentWrapper>
        <ContentBody>{params.id}</ContentBody>
      </ContentWrapper>
    </>
  );
};

export default CameraPage;

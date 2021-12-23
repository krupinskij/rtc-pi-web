import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import ContentBody from 'components/common/ContentBody';
import { ContentWrapper } from 'components/common/styled';
import useWebRTC from 'hooks/useWebRTC';

const CameraPage = () => {
  const params = useParams();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const {} = useWebRTC(params.id || '', videoRef);

  return (
    <>
      <video ref={videoRef} autoPlay playsInline />;
      <ContentWrapper>
        <ContentBody>{params.id}</ContentBody>
        <ContentBody>{params.id}</ContentBody>
      </ContentWrapper>
    </>
  );
};

export default CameraPage;

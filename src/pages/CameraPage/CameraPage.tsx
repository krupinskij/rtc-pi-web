import { useRef } from 'react';
import { useParams } from 'react-router-dom';

import Card, { CardContent } from 'components/Card';
import Container from 'components/common/Container';
import useWebRTC from 'hooks/useWebRTC';

const CameraPage = () => {
  const params = useParams();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useWebRTC(params.id || '', videoRef);

  return (
    <>
      <video ref={videoRef} controls autoPlay></video>;
      <Container size="large">
        <Card>
          <CardContent>{params.id}</CardContent>
        </Card>
      </Container>
    </>
  );
};

export default CameraPage;

import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

import config from 'config';

const useWebRTC = (
  cameraId: string,
  videoRef: React.MutableRefObject<HTMLVideoElement | null>
): {} => {
  const connectionRef = useRef(new RTCPeerConnection());
  const channelRef = useRef<RTCDataChannel>();
  const socketRef = useRef(io(config.BASE_URL || ''));
  const streamRef = useRef(new MediaStream());

  const [localDescription, setLocalDescription] = useState<RTCSessionDescription>();

  useEffect(() => {
    connectionRef.current.addEventListener('icecandidate', () => {
      if (!localDescription && connectionRef.current.localDescription) {
        console.log(connectionRef.current.localDescription);
        setLocalDescription(connectionRef.current.localDescription);
      }
    });

    connectionRef.current.addEventListener('datachannel', (event) => {
      channelRef.current = event.channel;

      channelRef.current.onmessage = (e) => console.log('messsage received!!!' + e.data);
      channelRef.current.onopen = (e) => console.log('open!!!!');
      channelRef.current.onclose = (e) => console.log('closed!!!!!!');
    });

    connectionRef.current.addEventListener('track', (event) => {
      console.log(event);
      event.streams[0].getTracks().forEach((track) => {
        streamRef.current.addTrack(track);
      });
    });

    if (videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }

    socketRef.current.emit('get-offer-from-server', cameraId);

    socketRef.current.on('send-offer-to-client', async (offer: RTCSessionDescriptionInit) => {
      const answer = await setConnection(offer);

      socketRef.current.emit('send-answer-to-server', cameraId, answer);
    });
  }, [connectionRef, streamRef, videoRef, cameraId]);

  useEffect(() => {
    if (channelRef.current) {
      channelRef.current.addEventListener('message', (event) =>
        console.debug('Message received: ' + event.data)
      );

      channelRef.current.addEventListener('open', () => console.debug('Open'));

      channelRef.current.addEventListener('close', () => console.debug('Close'));
    }
  }, [channelRef]);

  const setConnection = async (
    offer: RTCSessionDescriptionInit
  ): Promise<RTCSessionDescriptionInit> => {
    await connectionRef.current.setRemoteDescription(offer);
    console.debug('Remote description set');
    const answer = await connectionRef.current.createAnswer();
    await connectionRef.current.setLocalDescription(answer);

    return answer;
  };

  return {};
};

export default useWebRTC;

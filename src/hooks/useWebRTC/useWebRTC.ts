import React, { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import config from 'config';

const useWebRTC = (cameraId: string, videoRef: React.MutableRefObject<HTMLVideoElement | null>) => {
  const connectionRef = useRef(new RTCPeerConnection());
  const channelRef = useRef<RTCDataChannel>();
  const socketRef = useRef<Socket>();

  const mediaSourceRef = useRef(new MediaSource());
  const sourceBufferRef = useRef<SourceBuffer>();

  const [localDescription, setLocalDescription] = useState<RTCSessionDescription>();

  useEffect(() => {
    socketRef.current = io(config.BASE_URL || '');

    socketRef.current.emit('get-offer-from-server', cameraId);

    socketRef.current.on('send-offer-to-client', async (offer: RTCSessionDescriptionInit) => {
      const answer = await setConnection(offer);

      socketRef.current?.emit('send-answer-to-server', cameraId, answer);
    });
  }, [cameraId]);

  useEffect(() => {
    if (sourceBufferRef.current) {
      console.log('sour');
      sourceBufferRef.current.addEventListener('error', (ev) => console.log(ev));
      sourceBufferRef.current.addEventListener('update', (ev) => console.log(ev));
    }
  }, [sourceBufferRef.current]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = URL.createObjectURL(mediaSourceRef.current);
      mediaSourceRef.current.addEventListener('sourceopen', () => {
        console.log('dupa');
        sourceBufferRef.current = mediaSourceRef.current.addSourceBuffer(
          'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
        );
        console.log(sourceBufferRef.current);
      });
    }
  }, [videoRef]);

  useEffect(() => {
    connectionRef.current.addEventListener('icecandidate', () => {
      console.log(localDescription);
      if (!localDescription && connectionRef.current.localDescription) {
        console.log(connectionRef.current.localDescription);
        setLocalDescription(connectionRef.current.localDescription);
      }
    });

    connectionRef.current.addEventListener('datachannel', (event) => {
      channelRef.current = event.channel;

      channelRef.current.onmessage = (e) => {
        console.log('messsage received!!!');
        console.log(e.data);
        if (mediaSourceRef.current.readyState === 'open' && sourceBufferRef.current) {
          try {
            sourceBufferRef.current.appendBuffer(e.data);
          } catch (err) {
            console.log(err);
          }
        }
        // videoSourceBuffer?.appendBuffer(e.data);
      };
      channelRef.current.onopen = (e) => console.log('open!!!!');
      channelRef.current.onclose = (e) => console.log('closed!!!!!!');
    });

    connectionRef.current.addEventListener('track', (event) => {
      console.log(event);
      event.streams[0].getTracks().forEach((track) => {
        // mediaStreamRef.current.addTrack(track);
      });
    });
  }, [connectionRef, videoRef, localDescription, cameraId]);

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

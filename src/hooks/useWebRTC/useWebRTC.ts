import { useEffect, useRef, useState } from 'react';

const useWebRTC = (): {
  localDescription?: RTCSessionDescription;
  setConnection: (offer: RTCSessionDescriptionInit) => Promise<void>;
} => {
  const connectionRef = useRef(new RTCPeerConnection());
  const channelRef = useRef<RTCDataChannel>();

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
  }, [connectionRef, localDescription]);

  useEffect(() => {
    if (channelRef.current) {
      channelRef.current.addEventListener('message', (event) =>
        console.debug('Message received: ' + event.data)
      );

      channelRef.current.addEventListener('open', () => console.debug('Open'));

      channelRef.current.addEventListener('close', () => console.debug('Close'));
    }
  }, [channelRef]);

  const setConnection = async (offer: RTCSessionDescriptionInit) => {
    await connectionRef.current.setRemoteDescription(offer);
    console.debug('Remote description set');
    const answer = await connectionRef.current.createAnswer();
    await connectionRef.current.setLocalDescription(answer);
  };

  return {
    localDescription,
    setConnection,
  };
};

export default useWebRTC;

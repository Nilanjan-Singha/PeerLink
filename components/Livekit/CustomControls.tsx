"use client";

import {
  useLocalParticipant,
  useRoomContext
} from '@livekit/components-react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  PhoneOff
} from 'lucide-react';
import React, { useState } from 'react';

export function CustomControls({ onLeave }: { onLeave: () => void }) {
  const { localParticipant } = useLocalParticipant();
  const room = useRoomContext();

  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);

  const toggleMic = async () => {
    await localParticipant.setMicrophoneEnabled(!mic);
    setMic(!mic);
  };

  const toggleCam = async () => {
    await localParticipant.setCameraEnabled(!cam);
    setCam(!cam);
  };

  const shareScreen = async () => {
    await localParticipant.setScreenShareEnabled(true);
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-3 bg-[#1e1f22] 
        px-4 py-3 rounded-full shadow-xl">

        <ControlButton active={mic} onClick={toggleMic}>
          {mic ? <Mic /> : <MicOff />}
        </ControlButton>

        <ControlButton active={cam} onClick={toggleCam}>
          {cam ? <Video /> : <VideoOff />}
        </ControlButton>

        <ControlButton onClick={shareScreen}>
          <Monitor />
        </ControlButton>

        <button
          onClick={onLeave}
          className="bg-red-500 hover:bg-red-600 
            p-3 rounded-full text-white transition">
          <PhoneOff />
        </button>
      </div>
    </div>
  );
}

function ControlButton({
  active = true,
  onClick,
  children
}: any) {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-full transition 
        ${active
          ? 'bg-[#2b2d31] text-white'
          : 'bg-[#3b3d44] text-red-400'
        }`}>
      {children}
    </button>
  );
}

"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  LiveKitRoom, 
  RoomAudioRenderer, 
  ControlBar, 
  GridLayout, 
  ParticipantTile, 
  useTracks 
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import '@livekit/components-styles';
import { Loader2, PhoneOff } from 'lucide-react';
import { getConnectionToken } from '../../context/LivekitContext';
import CallHeader from '../../components/Livekit/CustomHeader';
import { CustomVideoGrid } from '../../components/Livekit/VideoGrid';
import { CustomControls } from '../../components/Livekit/CustomControls';

export default function ConnectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const topicId = searchParams.get('topic'); 
  const username = searchParams.get('username');
  
  const [token, setToken] = useState("");
  const [assignedRoom, setAssignedRoom] = useState("");

  useEffect(() => {
    if (!topicId || !username) {
      router.push('/');
      return;
    }

    const fetchToken = async () => {
      try {
        const data = await getConnectionToken(topicId, username);
        setToken(data.token);
        setAssignedRoom(data.roomName);
      } catch (error) {
        console.error("Failed to connect:", error);
        router.push('/');
      }
    };

    fetchToken();
  }, [topicId, username, router]);

  if (!token) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0b1120] text-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-[#c259ee]" />
          <p className="text-sm font-bold uppercase tracking-widest opacity-50">Finding available room...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#0b1120]" data-lk-theme="default">
      <LiveKitRoom
  audio
  video
  token={token}
  serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
  onDisconnected={() => router.push('/')}
  className="h-screen w-screen bg-[#0b1120] relative"
>
  <CallHeader topic={topicId!} room={assignedRoom} />

  <CustomVideoGrid />

  <CustomControls onLeave={() => router.push('/')} />

  <RoomAudioRenderer />
</LiveKitRoom>
    </div>
  );
}

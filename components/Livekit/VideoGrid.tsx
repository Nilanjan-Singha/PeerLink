"use client";

import React from 'react';
import { Track } from 'livekit-client';
import { useTracks, GridLayout, ParticipantTile } from '@livekit/components-react';

export function CustomVideoGrid() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: false },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  return (
    <div className="h-full w-full flex items-center justify-center px-6">
      <GridLayout
        tracks={tracks}
        className="max-w-6xl w-full"
      >
        <ParticipantTile />
      </GridLayout>
    </div>
  );
}

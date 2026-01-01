"use client";

import React, { useState } from 'react';
import { Track } from 'livekit-client';
import { useTracks, ParticipantTile, TrackReferenceOrPlaceholder } from '@livekit/components-react';
import { Maximize2, Minimize2, Pin, PinOff } from 'lucide-react';

export function CustomVideoGrid() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  // State to store the unique ID of the focused track
  // ID Format: "participantIdentity_trackSource"
  const [focusedTrackId, setFocusedTrackId] = useState<string | null>(null);

  // Helper to generate unique ID for a track
  const getTrackId = (track: TrackReferenceOrPlaceholder) => 
    `${track.participant.identity}_${track.source}`;

  // Toggle focus logic
  const handleToggleFocus = (track: TrackReferenceOrPlaceholder) => {
    const id = getTrackId(track);
    setFocusedTrackId(prev => prev === id ? null : id);
  };

  const handleUnfocus = (e: React.MouseEvent) => {
    e.stopPropagation(); // <--- CRITICAL FIX
    setFocusedTrackId(null);
  };


  // Split tracks into "Focused" and "Others"
  const focusedTrack = tracks.find(t => getTrackId(t) === focusedTrackId);
  const otherTracks = tracks.filter(t => getTrackId(t) !== focusedTrackId);

  // --- MODE 1: FOCUSED VIEW ---
  if (focusedTrack) {
    return (
      <div className="h-full w-full p-4 flex flex-col md:flex-row gap-4 bg-[#0b1120]">
        
        {/* Main Stage (Large) */}
        <div className="flex-1 relative rounded-2xl overflow-hidden bg-[#1e293b] border border-white/10 shadow-2xl">
          <ParticipantTile 
            trackRef={focusedTrack} 
            className="w-full h-full object-contain"
          />
          {/* Unfocus Button Overlay */}
          <button 
            onClick={handleUnfocus}
            className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 text-white rounded-lg backdrop-blur-md transition-all z-20"
          >
            <Minimize2 className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar List (Others) */}
        {otherTracks.length > 0 && (
          <div className="
            flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto 
            h-[120px] md:h-full md:w-[280px] shrink-0
            pb-2 md:pb-0
          ">
            {otherTracks.map((track) => (
              <div 
                key={getTrackId(track)}
                onClick={() => handleToggleFocus(track)}
                className="
                  relative flex-shrink-0 cursor-pointer overflow-hidden rounded-xl bg-[#1e293b] border border-white/10 hover:border-emerald-500/50 transition-all
                  w-[160px] md:w-full aspect-video
                "
              >
                <ParticipantTile 
                  trackRef={track} 
                  className="w-full h-full object-cover"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center group">
                    <Maximize2 className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // --- MODE 2: GRID VIEW (Your existing logic) ---
  const isSingleParticipant = tracks.length === 1;

  return (
    <div className="h-full w-full flex items-center justify-center p-6 bg-[#0b1120]">
      <div 
        className={`
          w-full h-full flex flex-wrap items-center justify-center gap-4 transition-all duration-500
          ${isSingleParticipant ? 'max-w-5xl' : 'max-w-[90vw] py-15'} 
        `}
      >
        {tracks.map((track) => (
          <div 
            key={getTrackId(track)}
            onClick={() => handleToggleFocus(track)} // Click to focus
            className={`
              relative overflow-hidden rounded-2xl bg-[#1e293b] border border-white/10 shadow-2xl transition-all duration-500 cursor-pointer group hover:ring-2 hover:ring-white/20
              ${isSingleParticipant 
                ? 'w-full aspect-video max-h-[80vh]' 
                : 'w-full md:w-[48%] lg:w-[40%] aspect-video max-w-200'
              }
            `}
          >
            <ParticipantTile 
              trackRef={track} 
              className="w-full h-full object-cover"
            />
            
            {/* Hover Icon to indicate interactability */}
            {!isSingleParticipant && (
              <div className="absolute top-3 right-3 p-1.5 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                 <Pin className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

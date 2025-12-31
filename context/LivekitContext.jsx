"use server";

import { AccessToken, RoomServiceClient } from 'livekit-server-sdk';

const MAX_PARTICIPANTS = 4;

export async function getConnectionToken(topicId, username) {
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  if (!apiKey || !apiSecret || !wsUrl) {
    throw new Error("Server misconfigured");
  }

  // 1. Initialize Room Service to check active rooms
  const roomService = new RoomServiceClient(wsUrl, apiKey, apiSecret);

  // 2. Fetch all active rooms
  // Note: In a large production app, you'd filter this query more efficiently or use Redis.
  const rooms = await roomService.listRooms();

  // 3. Find an available room for this topic
  let targetRoom = "";
  
  // Filter rooms that start with the topicId (e.g., "dsa-room-1", "dsa-room-2")
  const topicRooms = rooms.filter(r => r.name.startsWith(`${topicId}-room-`));

  for (const room of topicRooms) {
    if (room.numParticipants < MAX_PARTICIPANTS) {
      targetRoom = room.name;
      break;
    }
  }

  // 4. If no open room found, create a new one with a timestamp/random ID
  if (!targetRoom) {
    const uniqueId = Math.random().toString(36).substring(7);
    targetRoom = `${topicId}-room-${uniqueId}`;
  }

  // 5. Generate Token for the target room
  const at = new AccessToken(apiKey, apiSecret, { identity: username });
  
  at.addGrant({
    roomJoin: true,
    room: targetRoom,
    canPublish: true,
    canSubscribe: true,
  });

  return {
    token: await at.toJwt(),
    roomName: targetRoom // Return the actual room name so the UI can display it
  };
}

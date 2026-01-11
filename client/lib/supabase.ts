import { createClient } from "@supabase/supabase-js";

// Supabase credentials
const supabaseUrl = "https://pvgkkengiyssclfhtyvw.supabase.co";
const supabaseAnonKey = "sb_publishable_f0SGz13tzJhO0ldRQSWC9w_s5_FWeE1";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export Supabase auth helper functions
export const signUpWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
};

export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return user;
};

export const resetPasswordForEmail = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}`,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const onAuthStateChange = (callback: (user: any) => void) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null);
  });
};

// Room Management Functions
export const createRoom = async (roomName: string, userId: string) => {
  // Generate a unique 6-character room code
  const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

  const { data, error } = await supabase
    .from("rooms")
    .insert({
      name: roomName,
      host_id: userId,
      room_code: roomCode,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create room: ${error.message}`);
  }

  return data;
};

export const joinRoom = async (roomCode: string, userId: string) => {
  // Check if room exists
  const { data: roomData, error: roomError } = await supabase
    .from("rooms")
    .select("id, host_id, name")
    .eq("room_code", roomCode)
    .single();

  if (roomError || !roomData) {
    throw new Error("Room not found");
  }

  // Create join request
  const { data, error } = await supabase
    .from("join_requests")
    .insert({
      room_id: roomData.id,
      user_id: userId,
      status: "pending",
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to send join request: ${error.message}`);
  }

  return { ...data, room: roomData };
};

export const approveJoinRequest = async (requestId: string) => {
  const { data, error } = await supabase
    .from("join_requests")
    .update({ status: "approved" })
    .eq("id", requestId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to approve request: ${error.message}`);
  }

  return data;
};

export const rejectJoinRequest = async (requestId: string) => {
  const { data, error } = await supabase
    .from("join_requests")
    .delete()
    .eq("id", requestId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to reject request: ${error.message}`);
  }

  return data;
};

export const getUserRooms = async (userId: string) => {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("host_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch rooms: ${error.message}`);
  }

  return data;
};

export const getRoomMembers = async (roomId: string) => {
  const { data, error } = await supabase
    .from("join_requests")
    .select("*, users:user_id(*)")
    .eq("room_id", roomId)
    .eq("status", "approved");

  if (error) {
    throw new Error(`Failed to fetch room members: ${error.message}`);
  }

  return data;
};

export const getRoomJoinRequests = async (roomId: string) => {
  const { data, error } = await supabase
    .from("join_requests")
    .select("*, users:user_id(*)")
    .eq("room_id", roomId)
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch join requests: ${error.message}`);
  }

  return data;
};

export const leaveRoom = async (roomId: string, userId: string) => {
  const { error } = await supabase
    .from("join_requests")
    .delete()
    .eq("room_id", roomId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(`Failed to leave room: ${error.message}`);
  }
};

export const deleteRoom = async (roomId: string, userId: string) => {
  // Verify the user is the host
  const { data: room, error: checkError } = await supabase
    .from("rooms")
    .select("host_id")
    .eq("id", roomId)
    .single();

  if (checkError || room?.host_id !== userId) {
    throw new Error("Unauthorized to delete this room");
  }

  // Delete join requests first
  await supabase.from("join_requests").delete().eq("room_id", roomId);

  // Delete the room
  const { error } = await supabase.from("rooms").delete().eq("id", roomId);

  if (error) {
    throw new Error(`Failed to delete room: ${error.message}`);
  }
};

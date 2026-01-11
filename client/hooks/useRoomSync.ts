import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export const useRoomSync = (roomId: string | null) => {
  const [joinRequests, setJoinRequests] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchJoinRequests = useCallback(async () => {
    if (!roomId) return;
    try {
      const { data, error } = await supabase
        .from("join_requests")
        .select("*, auth.users(*)")
        .eq("room_id", roomId)
        .eq("status", "pending");

      if (error) {
        console.error("Error fetching join requests:", error);
      } else {
        setJoinRequests(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, [roomId]);

  const fetchMembers = useCallback(async () => {
    if (!roomId) return;
    try {
      const { data, error } = await supabase
        .from("join_requests")
        .select("*, auth.users(*)")
        .eq("room_id", roomId)
        .eq("status", "approved");

      if (error) {
        console.error("Error fetching members:", error);
      } else {
        setMembers(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, [roomId]);

  useEffect(() => {
    setIsLoading(true);
    fetchJoinRequests();
    fetchMembers();
    setIsLoading(false);

    if (!roomId) return;

    // Subscribe to join_requests changes
    const joinRequestsChannel = supabase
      .channel(`join_requests:${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "join_requests",
          filter: `room_id=eq.${roomId}`,
        },
        () => {
          fetchJoinRequests();
          fetchMembers();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(joinRequestsChannel);
    };
  }, [roomId, fetchJoinRequests, fetchMembers]);

  return {
    joinRequests,
    members,
    isLoading,
    refetch: () => {
      fetchJoinRequests();
      fetchMembers();
    },
  };
};

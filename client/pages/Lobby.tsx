import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRoomSync } from "@/hooks/useRoomSync";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CreateRoomModal from "@/components/CreateRoomModal";
import JoinRoomModal from "@/components/JoinRoomModal";
import { Button } from "@/components/ui/button";
import {
  createRoom,
  joinRoom,
  getUserRooms,
  approveJoinRequest,
  rejectJoinRequest,
  getRoomJoinRequests,
  deleteRoom,
} from "@/lib/supabase";
import {
  Plus,
  LogOut,
  Copy,
  Users,
  CheckCircle,
  XCircle,
  Trash2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Lobby() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [rooms, setRooms] = useState<any[]>([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [isJoiningRoom, setIsJoiningRoom] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const { joinRequests, members } = useRoomSync(selectedRoomId);

  // Fetch user's rooms
  useEffect(() => {
    const fetchRooms = async () => {
      if (!user?.id) return;

      try {
        setIsLoadingRooms(true);
        const data = await getUserRooms(user.id);
        setRooms(data || []);
        if (data && data.length > 0) {
          setSelectedRoomId(data[0].id);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
        toast({
          title: "Error",
          description: "Failed to load your rooms",
          variant: "destructive",
        });
      } finally {
        setIsLoadingRooms(false);
      }
    };

    fetchRooms();
  }, [user?.id, toast]);

  const handleCreateRoom = async (roomName: string) => {
    if (!user?.id) return;

    try {
      setIsCreatingRoom(true);
      const newRoom = await createRoom(roomName, user.id);
      setRooms([newRoom, ...rooms]);
      setSelectedRoomId(newRoom.id);
      toast({
        title: "Success",
        description: `Room "${roomName}" created! Share the code: ${newRoom.room_code}`,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create room";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsCreatingRoom(false);
    }
  };

  const handleJoinRoom = async (roomCode: string) => {
    if (!user?.id) return;

    try {
      setIsJoiningRoom(true);
      await joinRoom(roomCode, user.id);
      toast({
        title: "Success",
        description: "Join request sent! Waiting for host approval.",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to join room";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsJoiningRoom(false);
    }
  };

  const handleApproveRequest = async (requestId: string) => {
    try {
      await approveJoinRequest(requestId);
      toast({
        title: "Success",
        description: "Join request approved!",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to approve request";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      await rejectJoinRequest(requestId);
      toast({
        title: "Success",
        description: "Join request rejected",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to reject request";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteRoom = async (roomId: string) => {
    if (!user?.id) return;
    if (!confirm("Are you sure you want to delete this room?")) return;

    try {
      await deleteRoom(roomId, user.id);
      setRooms(rooms.filter((r) => r.id !== roomId));
      if (selectedRoomId === roomId) {
        setSelectedRoomId(rooms[0]?.id || null);
      }
      toast({
        title: "Success",
        description: "Room deleted",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete room";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied",
      description: "Room code copied to clipboard!",
    });
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const currentRoom = rooms.find((r) => r.id === selectedRoomId);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation onGetStarted={() => {}} hideGetStarted={true} />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Welcome to CINE SPHERE Lobby
            </h1>
            <p className="text-lg text-foreground/70">
              {user?.email
                ? `Logged in as ${user.email}`
                : "Virtual Theatre Experience"}
            </p>
          </div>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="border-border hover:bg-secondary"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-primary hover:opacity-90 text-primary-foreground h-12"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Room
          </Button>
          <Button
            onClick={() => setIsJoinModalOpen(true)}
            variant="outline"
            className="border-primary hover:bg-primary/10 text-primary h-12"
          >
            Join Room
          </Button>
        </div>

        {/* Content */}
        {isLoadingRooms ? (
          <div className="text-center py-12">
            <p className="text-foreground/70">Loading rooms...</p>
          </div>
        ) : rooms.length === 0 ? (
          <div className="bg-secondary rounded-lg p-12 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              No Rooms Yet
            </h2>
            <p className="text-foreground/70 mb-8">
              Create your first virtual room to get started or join an existing
              one!
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-primary hover:opacity-90"
              >
                Create Room
              </Button>
              <Button
                onClick={() => setIsJoinModalOpen(true)}
                variant="outline"
                className="border-primary hover:bg-primary/10"
              >
                Join Room
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Rooms List */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Your Rooms
              </h2>
              <div className="space-y-4">
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoomId(room.id)}
                    className={`p-6 rounded-lg border cursor-pointer transition-all duration-300 ${
                      selectedRoomId === room.id
                        ? "bg-primary/10 border-primary"
                        : "bg-secondary border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">
                          {room.name}
                        </h3>
                        <p className="text-foreground/70">
                          Created{" "}
                          {new Date(room.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRoom(room.id);
                        }}
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Room Code */}
                    <div className="bg-background rounded p-4 mb-4">
                      <p className="text-sm text-foreground/70 mb-2">
                        Room Code
                      </p>
                      <div className="flex items-center gap-2">
                        <code className="text-lg font-mono font-bold text-primary">
                          {room.room_code}
                        </code>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyCode(room.room_code);
                          }}
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:bg-primary/10"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-4 text-sm">
                      <span className="text-foreground/70">
                        <Users className="w-4 h-4 inline mr-1" />
                        {members.length} member{members.length !== 1 ? "s" : ""}
                      </span>
                      {selectedRoomId === room.id &&
                        joinRequests.length > 0 && (
                          <span className="text-yellow-500">
                            {joinRequests.length} pending request
                            {joinRequests.length !== 1 ? "s" : ""}
                          </span>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Details Panel */}
            {currentRoom && (
              <div className="lg:col-span-1">
                <div className="sticky top-20">
                  {/* Join Requests */}
                  {joinRequests.length > 0 && (
                    <div className="bg-secondary rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-bold text-foreground mb-4">
                        Join Requests ({joinRequests.length})
                      </h3>
                      <div className="space-y-3">
                        {joinRequests.map((request) => (
                          <div
                            key={request.id}
                            className="bg-background rounded p-4"
                          >
                            <p className="text-foreground font-semibold mb-2">
                              {request.user_id}
                            </p>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleApproveRequest(request.id)}
                                size="sm"
                                className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                onClick={() => handleRejectRequest(request.id)}
                                size="sm"
                                variant="outline"
                                className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Room Members */}
                  {members.length > 0 && (
                    <div className="bg-secondary rounded-lg p-6">
                      <h3 className="text-lg font-bold text-foreground mb-4">
                        Members ({members.length})
                      </h3>
                      <div className="space-y-2">
                        {members.map((member) => (
                          <div
                            key={member.id}
                            className="p-3 bg-background rounded flex items-center gap-2"
                          >
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <p className="text-foreground text-sm">
                              {member.user_id}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {joinRequests.length === 0 && members.length === 0 && (
                    <div className="bg-secondary rounded-lg p-6 text-center">
                      <p className="text-foreground/70">
                        No join requests or members yet
                      </p>
                      <p className="text-sm text-foreground/50 mt-2">
                        Share the room code to invite others
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />

      {/* Modals */}
      <CreateRoomModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateRoom}
        isLoading={isCreatingRoom}
      />
      <JoinRoomModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onSubmit={handleJoinRoom}
        isLoading={isJoiningRoom}
      />
    </div>
  );
}

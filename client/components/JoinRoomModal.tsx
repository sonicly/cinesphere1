import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

interface JoinRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (roomCode: string) => Promise<void>;
  isLoading?: boolean;
}

export default function JoinRoomModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: JoinRoomModalProps) {
  const [roomCode, setRoomCode] = useState("");

  const handleSubmit = async () => {
    if (!roomCode.trim()) {
      alert("Please enter a room code");
      return;
    }

    try {
      await onSubmit(roomCode.toUpperCase());
      setRoomCode("");
      onClose();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to join room";
      alert(message);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-background border border-border">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">
            Join a Room
          </AlertDialogTitle>
          <AlertDialogDescription className="text-foreground/70">
            Enter the room code shared by the host. The host will need to
            approve your request.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="py-4">
          <Input
            placeholder="e.g., ABC123"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            className="bg-secondary border-border text-foreground placeholder:text-foreground/50 uppercase"
            disabled={isLoading}
            maxLength={6}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
          />
          <p className="text-sm text-foreground/50 mt-2">
            Room codes are 6 characters long
          </p>
        </div>

        <div className="flex gap-4">
          <AlertDialogCancel
            disabled={isLoading}
            className="border-border hover:bg-secondary"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading || !roomCode.trim()}
            onClick={handleSubmit}
            className="bg-primary hover:opacity-90"
          >
            {isLoading ? "Joining..." : "Send Join Request"}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

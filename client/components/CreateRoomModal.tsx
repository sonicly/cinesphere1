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

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (roomName: string) => Promise<void>;
  isLoading?: boolean;
}

export default function CreateRoomModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: CreateRoomModalProps) {
  const [roomName, setRoomName] = useState("");

  const handleSubmit = async () => {
    if (!roomName.trim()) {
      alert("Please enter a room name");
      return;
    }

    try {
      await onSubmit(roomName);
      setRoomName("");
      onClose();
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-background border border-border">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">
            Create New Room
          </AlertDialogTitle>
          <AlertDialogDescription className="text-foreground/70">
            Enter a name for your virtual room. You'll receive a unique code to
            share with others.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="py-4">
          <Input
            placeholder="e.g., Movie Night, Gaming Session"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="bg-secondary border-border text-foreground placeholder:text-foreground/50"
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
          />
        </div>

        <div className="flex gap-4">
          <AlertDialogCancel
            disabled={isLoading}
            className="border-border hover:bg-secondary"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading || !roomName.trim()}
            onClick={handleSubmit}
            className="bg-primary hover:opacity-90"
          >
            {isLoading ? "Creating..." : "Create Room"}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

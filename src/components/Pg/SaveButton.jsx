import { useState, useEffect } from "react";
import axios from "axios";
import { Heart } from "lucide-react";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "../hooks/use-toast";
import { useAuth } from "../context/AuthContext";

export default function SaveButton({
  pgId,
  pgName,
  address,
  image,
  price,
  initialSaved = false,
  onSaveToggle,
}) {
  const [isSaved, setIsSaved] = useState(initialSaved);
  const { toast } = useToast();

  const { user } = useAuth();
  const userId = user.user_id;

  const getSavedPgs = async () => {
    try {
      const response = await axios.get(
        "https://findmypg-i01x.onrender.com/api/get_saved_pgs",
        {
          headers: {
            user_id: userId,
          },
        }
      );

      if (response.data) {
        const savedPgs = response.data.saved_pgs || [];
        setIsSaved(savedPgs.includes(pgId));
      }
    } catch (error) {
      console.log("Error fetching Saved Pg.", error);
    }
  };
  useEffect(() => {
    getSavedPgs();
    // Optionally fetch saved status from backend if not passed via props
  }, [pgId]);

  const handleSaveToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (isSaved) {
        // DELETE request to unsave
        await axios.post("https://findmypg-i01x.onrender.com/api/unsave_pg", {
          user_id: userId,
          pg_id: pgId,
        });

        toast({
          title: "PG Removed",
          description: `${pgName} has been removed from your saved PGs`,
        });
      } else {
        // POST request to save
        await axios.post("https://findmypg-i01x.onrender.com/api/save_pg", {
          user_id: userId,
          pg_id: pgId,
        });

        toast({
          title: "PG Saved",
          description: `${pgName} has been added to your saved PGs`,
        });
      }

      setIsSaved(!isSaved);

      if (onSaveToggle) onSaveToggle(pgId, !isSaved);
    } catch (error) {
      console.error("Error saving/removing PG:", error);
      toast({ title: "Error", description: "Something went wrong!" });
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`rounded-full bg-blue-100 backdrop-blur-sm hover:bg-gray-100 ${
        isSaved
          ? "text-blue-700 hover:text-blue-600"
          : "text-gray-500 hover:text-gray-700"
      }`}
      onClick={handleSaveToggle}
      title={isSaved ? "Remove from saved" : "Save PG"}
    >
      <Bookmark className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
    </Button>
  );
}

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { supabase } from "../supabaseClient";
import type { personalBest } from "../types/types";

export const usePersonalBest = (id: string | undefined) => {
  return useQuery<personalBest>({
    queryKey: ["personalBest", id],
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("No session found");
      }
      const res = await axios.get(
        `http://localhost:3000/exercises/${id}/personalbest`,
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        },
      );
      return res.data.data;
    },
    enabled: !!id,
  });
};

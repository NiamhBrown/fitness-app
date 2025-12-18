import type { personalBest } from "@/types/types";
import { FormatDateNumeric } from "@/util/utils";
import { PartyPopper } from "lucide-react";

interface Props {
  data: personalBest;
}
export const PersonalBest = ({ data }: Props) => {
  const date = FormatDateNumeric(data.date);
  return (
    <div className="bg-accent text-primary-foreground flex flex-row space-x-4 rounded p-2">
      <div>
        <PartyPopper />
      </div>
      <p>
        current PB: {data.weight}kg x {data.reps} on {date}
      </p>
    </div>
  );
};

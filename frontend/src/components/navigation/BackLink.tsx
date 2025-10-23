import { ArrowBigLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
}

export const BackLink = ({ to }: Props) => {
  return (
    <Link to={to} className="text-primary flex items-center gap-2">
      <ArrowBigLeft />
      <span className="hover:underline">back</span>
    </Link>
  );
};

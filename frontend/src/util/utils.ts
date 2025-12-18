const getOrdinal = (day: number) => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const pad = (num: number) => String(num).padStart(2, "0");

export const formatSeconds = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  return `${pad(minutes)}:${pad(seconds)}`;
};

export const FormatDateNumeric = (rawDate: string) => {
  const d = new Date(rawDate);
  return d.toLocaleDateString();
};
export const formatDateShortText = (rawDate: string) => {
  const date = new Date(rawDate);

  const weekday = date.toLocaleDateString("en-GB", { weekday: "short" });
  const day = date.getDate();
  const month = date.toLocaleDateString("en-GB", { month: "short" });

  return `${weekday}, ${day}${getOrdinal(day)} ${month}`;
};

export const formatTime12h = (isoString: string): string => {
  const date = new Date(isoString);

  return date
    .toLocaleTimeString("en-GB", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();
};

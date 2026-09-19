const SHORT = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});
const MONTH = new Intl.DateTimeFormat("en-US", {
  month: "long",
  timeZone: "UTC",
});
const ORDINAL = new Intl.PluralRules("en-US", { type: "ordinal" });
const SUFFIXES: Record<string, string> = {
  one: "st",
  two: "nd",
  few: "rd",
  other: "th",
};

interface PostDateProps {
  date?: string;
  className?: string;
}

/**
 * Renders a date as "Mar 25, 2026", with the full date ("March 25th, 2026")
 * in a native hover tooltip. Formatting is pinned to en-US/UTC so server and
 * client agree and a date-only string never drifts a day.
 */
export default function PostDate({ date, className }: PostDateProps) {
  const parsed = date ? new Date(date) : null;
  if (!parsed || Number.isNaN(parsed.getTime())) {
    return <span className={className}>Undated</span>;
  }

  const day = parsed.getUTCDate();
  const full = `${MONTH.format(parsed)} ${day}${SUFFIXES[ORDINAL.select(day)]}, ${parsed.getUTCFullYear()}`;

  return (
    <time
      dateTime={parsed.toISOString().slice(0, 10)}
      title={full}
      className={className}
    >
      {SHORT.format(parsed)}
    </time>
  );
}

import Reveal from "./Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  inverted?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
  inverted = false,
}: Props) {
  const alignment =
    align === "center" ? "text-center items-center mx-auto" : "text-left items-start";

  return (
    <Reveal className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <span
          className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.2em] ${
            inverted
              ? "border-timber-200/30 bg-white/5 text-timber-200"
              : "border-timber-200 bg-timber-50 text-timber-700"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              inverted ? "bg-timber-300" : "bg-timber-500"
            }`}
          />
          {eyebrow}
        </span>
      )}
      <h2
        className={`max-w-3xl text-[1.85rem] leading-[1.15] sm:text-4xl lg:text-[2.7rem] ${
          inverted ? "text-sand-50" : "text-bark-800"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 max-w-2xl text-[1.02rem] leading-relaxed ${
            inverted ? "text-sand-200/80" : "text-muted"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

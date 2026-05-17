import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen text-center px-6"
      style={{ background: "var(--color-bg)" }}
    >
      <p className="eyebrow mb-4">404 — page not found</p>
      <h1 className="font-display text-6xl font-medium text-ink lowercase mb-4">
        nothing to see here
      </h1>
      <p className="text-ink-soft mb-8 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
      </p>
      <Button href="/" variant="primary">back to home</Button>
    </main>
  );
}

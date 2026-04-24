export const SectionLabel = ({ number, text }: { number: string; text: string }) => (
  <div className="flex items-center gap-4 mb-12">
    <span className="text-accent-2 font-mono text-sm">{number}</span>
    <div className="h-px w-12 bg-border" />
    <span className="text-text-muted text-sm uppercase tracking-widest font-medium">{text}</span>
  </div>
);

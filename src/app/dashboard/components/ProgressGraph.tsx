
interface ProgressGraphProps {
  userId: string;
}

export default function ProgressGraph({ userId }: ProgressGraphProps) {
  return (
    <div className="flex h-64 items-center justify-center rounded-md bg-muted">
      <p className="text-muted-foreground">Progress chart will appear here</p>
    </div>
  );
}
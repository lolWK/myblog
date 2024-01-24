import { Badge } from '@/components/ui/badge';

interface CustomBadgeProps {
  type: 'topic' | 'number';
  children: React.ReactNode;
}

export default function CustomBadge({ type, children }: CustomBadgeProps) {
  return (
    <Badge
      className={`${
        type === 'topic'
          ? 'min-w-16 justify-center rounded px-1 py-1 font-h font-normal text-background'
          : 'font-p font-medium'
      }`}
      variant={`${type === 'topic' ? 'default' : 'secondary'}`}
    >
      {children}
    </Badge>
  );
}

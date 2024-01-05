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
          ? 'w-[64px] justify-center rounded py-1 font-h text-px12-400 text-background'
          : 'font-p text-px12-500 font-medium'
      }`}
      variant={`${type === 'topic' ? 'default' : 'secondary'}`}
    >
      {children}
    </Badge>
  );
}

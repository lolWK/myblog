import CustomBadge from '@/components/common/CustomBadge';

interface PostListHeaderProps {
  leftText: string;
  rightText: number;
}

export default function PostListHeader({
  leftText,
  rightText,
}: PostListHeaderProps) {
  return (
    <div className='flex w-full justify-between border-b border-foreground pb-4'>
      <p className='font-h text-px14-300'>{leftText}</p>
      <CustomBadge type='number'>{rightText}</CustomBadge>
    </div>
  );
}

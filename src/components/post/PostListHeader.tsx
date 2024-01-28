import CustomBadge from '@/components/common/CustomBadge';

interface PostListHeaderProps {
  leftText: string;
  rightText?: number | null;
}

export default function PostListHeader({
  leftText,
  rightText = null,
}: PostListHeaderProps) {
  return (
    <div className='flex w-full justify-between border-b border-foreground pb-4'>
      <p className='font-h text-px14-300'>{leftText}</p>
      {typeof rightText === 'number' && (
        <CustomBadge type='number'>{rightText}</CustomBadge>
      )}
    </div>
  );
}

import cn from 'src/utilities/cn';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-neutral-200 dark:bg-neutral-1100 animate-pulse rounded-md', className)}
      {...props}
    />
  );
}

export { Skeleton };

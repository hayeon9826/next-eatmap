import cn from 'classnames';

export default function Loader({ className = '' }) {
  return (
    <div className={cn('flex justify-center gap-4 py-4', className)}>
      <span className="w-2 h-2 animate-ping rounded-full bg-gray-500"></span>
      <span className="w-2 h-2 animate-ping rounded-full bg-gray-500"></span>
      <span className="w-2 h-2 animate-ping rounded-full bg-gray-500"></span>
    </div>
  );
}

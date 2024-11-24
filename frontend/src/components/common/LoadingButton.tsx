import Spinner from 'src/assets/svg/spinner';

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

export const LoadingButton = ({
  loading,
  children,
  className,
  ...props
}: LoadingButtonProps) => {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`relative ${
        className ||
        'w-full bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
      }`}
    >
      {loading ? (
        <div className='flex items-center justify-center'>
          <Spinner />
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

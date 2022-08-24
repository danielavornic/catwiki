import classNames from 'classnames';

type InputSize = 'medium' | 'small' | 'large';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
}

export const Input = ({ className, size = 'medium', type, ...props }: InputProps) => {
  return (
    <input
      className={classNames(className, 'rounded transition', {
        'py-2 px-4': size === 'medium',
        'bg-blue-500 hover:bg-blue-600 cursor-pointer text-white': type === 'submit',
        'border focus:outline-none hover:border-gray-500 focus:border-gray-500': type !== 'submit',
      })}
      type={type}
      {...props}
    />
  );
};

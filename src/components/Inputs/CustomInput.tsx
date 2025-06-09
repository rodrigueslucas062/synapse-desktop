interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  secondIcon?: React.ReactNode;
}

export const CustomInput = ({
  type,
  name,
  id,
  placeholder,
  value,
  onChange,
  icon,
  secondIcon,
  required = false,
}: CustomInputProps) => {
  return (
    <div className="w-full mt-5 relative">
      <span className="absolute inset-y-0 left-3 flex items-center text-white">
        {icon}
      </span>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className="w-full bg-zinc-950 ring-1 ring-zinc-800 bg-opacity-20 px-10 py-2.5 text-white text-sm tracking-[1px] rounded-lg focus:outline-none"
        value={value}
        onChange={onChange}
        required={required}
      />
      <div>{secondIcon}</div>
    </div>
  );
};

export const Input = ({ placeholder, name, value, type, handleChange }) => {
  return (
    <input
      step="0.0001"
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={(e) => handleChange(e, name)}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  );
};

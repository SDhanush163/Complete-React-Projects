const Input = ({ textArea, label, ...props }) => {
  const inputStyle =
    "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";

  const toCamelCase = (s) => s.replace(/[-_](.)/g, (_, c) => c.toUpperCase());
  const id = toCamelCase(label);

  return (
    <p className="flex flex-col gap-1 my-4">
      <label
        htmlFor={id}
        className="text-sm font-bold uppercase text-stone-500"
      >
        {label}
      </label>
      {textArea ? (
        <textarea id={id} className={inputStyle} {...props}></textarea>
      ) : (
        <input id={id} className={inputStyle} {...props} />
      )}
    </p>
  );
};

export default Input;

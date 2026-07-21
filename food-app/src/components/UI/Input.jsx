// Reusable input component
const Input = ({ id, label, ...props }) => {
  return (
    <p className="control">
      {/* Input label */}
      <label htmlFor={id}>{label}</label>

      {/* Input field with forwarded props */}
      <input id={id} name={id} required {...props} />
    </p>
  );
};

export default Input;

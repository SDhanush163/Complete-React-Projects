// Reusable button component
const Button = ({ children, textOnly, className, ...props }) => {
  // Apply button style based on the textOnly prop
  let cssClasses = textOnly ? "text-button" : "button";
  cssClasses += ` ${className}`;

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;

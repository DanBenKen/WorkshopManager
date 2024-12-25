const Button = ({ type = 'button', onClick, disabled, label, className = '' }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`p-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all duration-300
            ${className}`}
            disabled={disabled}
      >
        {label}
      </button>
    );
  };
  
  export default Button;
  
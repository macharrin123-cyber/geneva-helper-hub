interface FormInputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  min?: string;
  step?: string;
  hint?: string;
}

const FormInput = ({ 
  id, 
  label, 
  type, 
  value, 
  onChange, 
  required = true,
  min,
  step,
  hint
}: FormInputProps) => {
  return (
    <div className="animate-fade-in">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors duration-200"
        required={required}
        min={min}
        step={step}
      />
      {hint && (
        <p className="mt-2 text-sm text-gray-500">
          {hint}
        </p>
      )}
    </div>
  );
};

export default FormInput;
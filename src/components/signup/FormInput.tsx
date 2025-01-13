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
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        required={required}
        min={min}
        step={step}
      />
      {hint && (
        <p className="mt-1 text-sm text-gray-500">
          {hint}
        </p>
      )}
    </div>
  );
};

export default FormInput;
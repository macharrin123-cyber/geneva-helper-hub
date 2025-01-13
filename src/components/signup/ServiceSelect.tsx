interface ServiceSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const ServiceSelect = ({ value, onChange }: ServiceSelectProps) => {
  return (
    <div>
      <label htmlFor="service" className="block text-sm font-medium text-gray-700">
        Service Type *
      </label>
      <select
        id="service"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        required
      >
        <option value="">Select a service</option>
        <option value="plumbing">Plumbing</option>
        <option value="electrical">Electrical</option>
        <option value="cleaning">Cleaning</option>
        <option value="carpentry">Carpentry</option>
        <option value="painting">Painting</option>
      </select>
      <p className="mt-1 text-sm text-gray-500">
        Choose the primary service you'll be offering to clients
      </p>
    </div>
  );
};

export default ServiceSelect;
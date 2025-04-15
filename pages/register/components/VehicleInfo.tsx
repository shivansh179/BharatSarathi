'use client';

interface VehicleInfoProps {
  vehicleData: {
    vehicleNumber: string;
    vehicleModel: string;
    vehicleYear: string;
  };
  updateVehicleData: (data: {
    vehicleNumber?: string;
    vehicleModel?: string;
    vehicleYear?: string;
  }) => void;
}

export default function VehicleInfo({ vehicleData, updateVehicleData }: VehicleInfoProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateVehicleData({ [name]: value });
  };

  // Get current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i);

  return (
    <div>
      <h2 className="text-xl font-semibold text-black mb-6">Vehicle Information</h2>
      <p className="text-gray-600 mb-6">
        Please provide information about the vehicle you will be using on our platform.
      </p>

      <div className="space-y-6">
        <div>
          <label htmlFor="vehicleNumber" className="block text-gray-700 mb-2">Vehicle Registration Number</label>
          <input
            type="text"
            id="vehicleNumber"
            name="vehicleNumber"
            value={vehicleData?.vehicleNumber}
            onChange={handleChange}
            placeholder="E.g., MH02AB1234"
            className="w-full border border-gray-300 rounded-lg text-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="text-sm text-gray-500 mt-2">
            Enter the registration number as shown on your vehicle's registration certificate
          </p>
        </div>

        <div>
          <label htmlFor="vehicleModel" className="block text-gray-700 mb-2">Vehicle Model</label>
          <input
            type="text"
            id="vehicleModel"
            name="vehicleModel"
            value={vehicleData?.vehicleModel}
            onChange={handleChange}
            placeholder="E.g., Maruti Swift, Honda City"
            className="w-full border border-gray-300 rounded-lg text-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="vehicleYear" className="block text-gray-700 mb-2">Manufacturing Year</label>
          <select
            id="vehicleYear"
            name="vehicleYear"
            value={vehicleData?.vehicleYear}
            onChange={handleChange}
            className="w-full border border-gray-300 text-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Year</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
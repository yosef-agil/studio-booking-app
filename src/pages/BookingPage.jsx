import { useState } from 'react';

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    theme: '',
    people: 1
  });

  const themes = [
    { id: 1, name: 'Natural Light', price: 150000 },
    { id: 2, name: 'Studio Lighting', price: 200000 },
    { id: 3, name: 'Premium Package', price: 300000 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-700 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Form Booking Studio</h2>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input fields dengan styling modern */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
              
              {/* ... tambahkan semua input field lainnya ... */}
            </div>

            {/* Price Summary Card */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-lg mb-3">Ringkasan Harga</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Harga per orang:</span>
                  <span className="font-medium">Rp 150.000</span>
                </div>
                {/* ... tambahkan detail harga ... */}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <button
              type="button"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg shadow-sm transition-colors duration-200"
            >
              Konfirmasi Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
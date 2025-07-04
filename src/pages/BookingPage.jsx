import { useState } from 'react';
import { format } from 'date-fns';

const BookingPage = () => {
  const [formData, setFormData] = useState({
    bookingDate: format(new Date(), 'yyyy-MM-dd'),
    timeSlot: '',
    customerName: '',
    whatsappNumber: '',
    theme: '',
    numberOfPeople: 1,
  });

  const themes = [
    { id: 1, name: 'Natural Light', price: 150000 },
    { id: 2, name: 'Studio Lighting', price: 200000 },
    { id: 3, name: 'Outdoor Shoot', price: 250000 },
  ];

  const timeSlots = [
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    const selectedTheme = themes.find(t => t.id === parseInt(formData.theme));
    return selectedTheme ? selectedTheme.price * formData.numberOfPeople : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Booking Studio Foto</h1>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Booking</label>
                <input
                  type="date"
                  name="bookingDate"
                  value={formData.bookingDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jam Tersedia</label>
                <select
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Pilih Jam</option>
                  {timeSlots.map((slot, index) => (
                    <option key={index} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="Nama Anda"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp</label>
                <input
                  type="tel"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  placeholder="08123456789"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tema Foto</label>
                <select
                  name="theme"
                  value={formData.theme}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Pilih Tema</option>
                  {themes.map(theme => (
                    <option key={theme.id} value={theme.id}>
                      {theme.name} (Rp {theme.price.toLocaleString('id-ID')})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Orang</label>
                <input
                  type="number"
                  name="numberOfPeople"
                  min="1"
                  max="10"
                  value={formData.numberOfPeople}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Ringkasan Booking</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Harga per orang:</span>
                <span className="font-medium">
                  Rp {themes.find(t => t.id === parseInt(formData.theme))?.price.toLocaleString('id-ID') || '0'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Jumlah orang:</span>
                <span className="font-medium">{formData.numberOfPeople}</span>
              </div>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="flex justify-between">
                <span className="text-gray-800 font-semibold">Total:</span>
                <span className="text-gray-800 font-semibold">
                  Rp {calculateTotal().toLocaleString('id-ID')}
                </span>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Pembayaran dilakukan secara offline di studio.
            </p>
          </div>

          {/* Submit Button */}
          <div className="px-6 py-4 bg-white border-t border-gray-200">
            <button
              type="button"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Booking Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
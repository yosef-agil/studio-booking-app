import { useState, useEffect } from 'react';
import { format, addDays, isBefore, isAfter } from 'date-fns';
import { id } from 'date-fns/locale';

const BookingPage = () => {
  const [formData, setFormData] = useState({
    bookingDate: format(new Date(), 'yyyy-MM-dd'),
    timeSlot: '',
    customerName: '',
    whatsappNumber: '',
    themeId: '',
    numberOfPeople: 1,
  });
  
  const [themes, setThemes] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [pricePerPerson, setPricePerPerson] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, these would be API calls
        const mockThemes = [
          { id: 1, name: 'Natural Light', description: 'Soft natural lighting' },
          { id: 2, name: 'Studio Lighting', description: 'Professional studio setup' },
          { id: 3, name: 'Outdoor', description: 'Outdoor photoshoot' },
        ];
        
        const mockTimes = [
          { id: 1, time_slot: '09:00 - 10:00', is_available: true },
          { id: 2, time_slot: '10:00 - 11:00', is_available: true },
          { id: 3, time_slot: '11:00 - 12:00', is_available: true },
          // ... more time slots
        ];
        
        setThemes(mockThemes);
        setAvailableTimes(mockTimes);
        setPricePerPerson(150000); // Default price
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Nama harus diisi';
    }
    
    if (!formData.whatsappNumber.trim()) {
      newErrors.whatsappNumber = 'Nomor WhatsApp harus diisi';
    } else if (!/^[0-9]+$/.test(formData.whatsappNumber)) {
      newErrors.whatsappNumber = 'Nomor WhatsApp harus berupa angka';
    }
    
    if (!formData.timeSlot) {
      newErrors.timeSlot = 'Pilih jam booking';
    }
    
    if (!formData.themeId) {
      newErrors.themeId = 'Pilih tema foto';
    }
    
    if (formData.numberOfPeople < 1) {
      newErrors.numberOfPeople = 'Minimal 1 orang';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTotalPrice = () => {
    return formData.numberOfPeople * pricePerPerson;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      console.log('Booking data:', {
        ...formData,
        totalPrice: calculateTotalPrice(),
        status: 'pending'
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setBookingSuccess(true);
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const minDate = format(new Date(), 'yyyy-MM-dd');
  const maxDate = format(addDays(new Date(), 30), 'yyyy-MM-dd');

  if (bookingSuccess) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h2 className="mt-3 text-lg font-medium text-gray-900">Booking Berhasil!</h2>
          <p className="mt-2 text-sm text-gray-500">
            Terima kasih {formData.customerName}, booking Anda pada tanggal {formData.bookingDate} jam {formData.timeSlot} telah diterima.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Kami akan menghubungi Anda via WhatsApp di {formData.whatsappNumber} untuk konfirmasi.
          </p>
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setBookingSuccess(false)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Buat Booking Baru
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Booking Studio Foto</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="bookingDate" className="block text-sm font-medium text-gray-700 mb-1">
            Tanggal Booking
          </label>
          <input
            type="date"
            id="bookingDate"
            name="bookingDate"
            min={minDate}
            max={maxDate}
            value={formData.bookingDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="timeSlot" className="block text-sm font-medium text-gray-700 mb-1">
            Jam Tersedia
          </label>
          <select
            id="timeSlot"
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Pilih Jam</option>
            {availableTimes.filter(time => time.is_available).map(time => (
              <option key={time.id} value={time.time_slot}>
                {time.time_slot}
              </option>
            ))}
          </select>
          {errors.timeSlot && <p className="mt-1 text-sm text-red-600">{errors.timeSlot}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
            Nama Lengkap
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Nama Anda"
            required
          />
          {errors.customerName && <p className="mt-1 text-sm text-red-600">{errors.customerName}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Nomor WhatsApp
          </label>
          <input
            type="tel"
            id="whatsappNumber"
            name="whatsappNumber"
            value={formData.whatsappNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="08123456789"
            required
          />
          {errors.whatsappNumber && <p className="mt-1 text-sm text-red-600">{errors.whatsappNumber}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="themeId" className="block text-sm font-medium text-gray-700 mb-1">
            Tema Foto
          </label>
          <select
            id="themeId"
            name="themeId"
            value={formData.themeId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Pilih Tema</option>
            {themes.map(theme => (
              <option key={theme.id} value={theme.id}>
                {theme.name} - {theme.description}
              </option>
            ))}
          </select>
          {errors.themeId && <p className="mt-1 text-sm text-red-600">{errors.themeId}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="numberOfPeople" className="block text-sm font-medium text-gray-700 mb-1">
            Jumlah Orang
          </label>
          <input
            type="number"
            id="numberOfPeople"
            name="numberOfPeople"
            min="1"
            max="10"
            value={formData.numberOfPeople}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          {errors.numberOfPeople && <p className="mt-1 text-sm text-red-600">{errors.numberOfPeople}</p>}
        </div>
        
        <div className="mb-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Ringkasan Booking</h3>
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Harga per orang:</span>
            <span className="font-medium">Rp {pricePerPerson.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Jumlah orang:</span>
            <span className="font-medium">{formData.numberOfPeople}</span>
          </div>
          <div className="border-t border-gray-200 my-2"></div>
          <div className="flex justify-between">
            <span className="text-gray-800 font-semibold">Total:</span>
            <span className="text-gray-800 font-semibold">Rp {calculateTotalPrice().toLocaleString('id-ID')}</span>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Pembayaran dilakukan secara offline di studio.
          </p>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Memproses...' : 'Booking Sekarang'}
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
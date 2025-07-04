const API_URL = import.meta.env.VITE_API_URL;

export const createBooking = async (data) => {
  return await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
};

export const getBookings = async () => {
  const res = await fetch(`${API_URL}/bookings`);
  return res.json();
};

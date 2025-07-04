import React, { useState } from 'react';

function BookingPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time_slot: '',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) alert("Booking submitted!");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-xl font-bold mb-4">Booking Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" onChange={handleChange} className="input w-full" />
        <input name="phone" placeholder="Phone" onChange={handleChange} className="input w-full" />
        <input name="date" type="date" onChange={handleChange} className="input w-full" />
        <input name="time_slot" placeholder="Time Slot" onChange={handleChange} className="input w-full" />
        <textarea name="notes" placeholder="Notes" onChange={handleChange} className="textarea w-full" />
        <button type="submit" className="btn btn-primary w-full">Submit</button>
      </form>
    </div>
  );
}

export default BookingPage;

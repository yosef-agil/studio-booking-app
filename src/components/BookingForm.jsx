import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

const BookingForm = () => {
  const [themes, setThemes] = useState([])
  const [availableTimes, setAvailableTimes] = useState([])
  const [pricePerPerson, setPricePerPerson] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ganti dengan API calls sebenarnya
        const [themesRes, timesRes, priceRes] = await Promise.all([
          axios.get('/api/themes'),
          axios.get('/api/available-times'),
          axios.get('/api/price'),
        ])
        
        setThemes(themesRes.data)
        setAvailableTimes(timesRes.data)
        setPricePerPerson(priceRes.data.price_per_person)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    
    fetchData()
  }, [])

  const formik = useFormik({
    initialValues: {
      bookingDate: new Date().toISOString().split('T')[0],
      timeSlot: '',
      customerName: '',
      whatsappNumber: '',
      themeId: '',
      numberOfPeople: 1,
    },
    validationSchema: Yup.object({
      bookingDate: Yup.date().required('Required'),
      timeSlot: Yup.string().required('Pilih jam booking'),
      customerName: Yup.string().required('Nama harus diisi'),
      whatsappNumber: Yup.string()
        .required('Nomor WhatsApp harus diisi')
        .matches(/^[0-9]+$/, 'Nomor harus berupa angka'),
      themeId: Yup.string().required('Pilih tema foto'),
      numberOfPeople: Yup.number()
        .min(1, 'Minimal 1 orang')
        .max(10, 'Maksimal 10 orang')
        .required('Jumlah orang harus diisi'),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true)
      try {
        const totalPrice = values.numberOfPeople * pricePerPerson
        await axios.post('/api/bookings', {
          ...values,
          totalPrice,
          status: 'pending',
        })
        setBookingSuccess(true)
      } catch (error) {
        console.error('Booking error:', error)
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  const calculateTotalPrice = () => {
    return formik.values.numberOfPeople * pricePerPerson
  }

  if (bookingSuccess) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        {/* Success message UI */}
      </div>
    )
  }

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      {/* Form fields */}
    </form>
  )
}

export default BookingForm
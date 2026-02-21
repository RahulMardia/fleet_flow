'use client'

import { useState } from 'react'
import TripForm from './components/TripForm'
import TripTable from './components/TripTable'

export default function TripsPage() {
  const [drivers] = useState([
    { id: '1', name: 'Rahul Sharma', status: 'Available' },
  ])

  const [vehicles] = useState([
    {
      id: '1',
      license_plate: 'GJ01AB1234',
      status: 'Available',
      max_capacity: 500,
    },
  ])

  const [trips, setTrips] = useState<any[]>([])

  const handleDispatch = (form: any) => {
    const newTrip = {
      id: crypto.randomUUID(),
      vehicle:
        vehicles.find(v => v.id === form.vehicleId)
          ?.license_plate || '',
      driver:
        drivers.find(d => d.id === form.driverId)?.name ||
        '',
      origin: form.origin,
      destination: form.destination,
      status: 'On Way',
    }

    setTrips(prev => [...prev, newTrip])
  }

  return (
    <div className="p-6 min-h-screen bg-[#0f1210] text-gray-100 space-y-6">
      <h1 className="text-2xl font-bold text-[#E4BF1B]">
        Trip Dispatcher & Management
      </h1>

      <TripTable trips={trips} />
      <TripForm
        drivers={drivers}
        vehicles={vehicles}
        onDispatch={handleDispatch}
      />
    </div>
  )
}
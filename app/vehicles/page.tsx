'use client'

import { useState } from 'react'
import { Vehicle } from './types'
import AddVehicleForm from './components/AddVehicleForm'
import VehicleTable from './components/VehicleTable'

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])

  const handleAddVehicle = (vehicle: Vehicle) => {
    setVehicles(prev => [...prev, vehicle])
  }

  return (
    <div className="p-6 space-y-6 min-h-screen bg-[#0f1210] text-gray-100">
      <h1 className="text-2xl font-bold text-[#1B1E19]">
        Vehicle Registry
      </h1>

      <AddVehicleForm onAdd={handleAddVehicle} />
      <VehicleTable vehicles={vehicles} />
    </div>
  )
}
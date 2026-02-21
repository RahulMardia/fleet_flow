'use client'

import { useState } from 'react'
import DriverTable from './components/DriverTable'
import AddDriverModal from './components/AddDriverModal'
import { Driver } from './types'

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [open, setOpen] = useState(false)

  const handleAddDriver = (data: any) => {
    const newDriver: Driver = {
      id: crypto.randomUUID(),
      name: data.name,
      age: Number(data.age),
      licenseNumber: data.licenseNumber,
      expiry: data.expiry,
      completionRate: 92,
      safetyScore: 89,
      complaints: 0,
      licensePhoto: data.licensePhoto,
    }

    setDrivers(prev => [...prev, newDriver])
  }

  return (
    <div className="p-6 min-h-screen bg-[#0f1210] text-gray-100 space-y-6">

      <h1 className="text-2xl font-bold text-[#E4BF1B]">
        Driver Performance & Safety Profiles
      </h1>

      <DriverTable
        drivers={drivers}
        onAddClick={() => setOpen(true)}
      />

      <AddDriverModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleAddDriver}
      />
    </div>
  )
}
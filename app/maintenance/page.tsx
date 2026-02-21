'use client'

import { useState } from 'react'
import ServiceForm from './components/ServiceForm'
import ServiceTable from './components/ServiceTable'

export default function MaintenancePage() {
  const [services, setServices] = useState<any[]>([])

  const handleCreate = (form: any) => {
    const newService = {
      id: crypto.randomUUID(),
      vehicle: form.vehicle,
      issue: form.issue,
      date: form.date,
      cost: '10k',
      status: 'New',
    }

    setServices(prev => [...prev, newService])
  }

  return (
    <div className="p-6 min-h-screen bg-[#0f1210] text-gray-100">
      <h1 className="text-2xl font-bold text-[#E4BF1B] mb-6">
        Maintenance & Service Logs
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ServiceForm onCreate={handleCreate} />
        <div className="lg:col-span-2">
          <ServiceTable services={services} />
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'

type Driver = {
  id: string
  name: string
  status: string
}

type Vehicle = {
  id: string
  license_plate: string
  status: string
  max_capacity: number
}

type Props = {
  drivers: Driver[]
  vehicles: Vehicle[]
  onDispatch: (trip: any) => void
}

export default function TripForm({
  drivers,
  vehicles,
  onDispatch,
}: Props) {
  const [form, setForm] = useState({
    vehicleId: '',
    driverId: '',
    cargoWeight: '',
    origin: '',
    destination: '',
    fuelCost: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const vehicle = vehicles.find(v => v.id === form.vehicleId)

    // ✅ capacity validation
    if (
      vehicle &&
      Number(form.cargoWeight) > vehicle.max_capacity
    ) {
      alert('Cargo exceeds vehicle capacity')
      return
    }

    onDispatch(form)

    setForm({
      vehicleId: '',
      driverId: '',
      cargoWeight: '',
      origin: '',
      destination: '',
      fuelCost: '',
    })
  }

  return (
  <div className="bg-[#1B1E19] rounded-2xl p-6 border border-[#2a2d27] w-full">
      <h2 className="text-lg font-semibold text-[#E4BF1B] mb-4">
        New Trip Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Vehicle */}
        <div>
          <label className="text-sm font-medium">
            Select Vehicle *
          </label>
          <select
            name="vehicleId"
            value={form.vehicleId}
            onChange={handleChange}
            className="w-full mt-1 bg-[#111410] border border-[#2f332d] rounded-lg p-2"
            required
          >
            <option value="">Choose vehicle</option>
            {vehicles.map(v => (
              <option key={v.id} value={v.id}>
                {v.license_plate} (Cap: {v.max_capacity}kg)
              </option>
            ))}
          </select>
        </div>

        {/* Cargo */}
        <div>
          <label className="text-sm font-medium">
            Cargo Weight (kg) *
          </label>
          <input
            name="cargoWeight"
            type="number"
            value={form.cargoWeight}
            onChange={handleChange}
            className="w-full mt-1 bg-[#111410] border border-[#2f332d] rounded-lg p-2"
            required
          />
        </div>

        {/* Driver */}
        <div>
          <label className="text-sm font-medium">
            Select Driver *
          </label>
          <select
            name="driverId"
            value={form.driverId}
            onChange={handleChange}
            className="w-full mt-1 bg-[#111410] border border-[#2f332d] rounded-lg p-2"
            required
          >
            <option value="">Choose driver</option>
            {drivers.map(d => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Origin */}
        <input
          name="origin"
          placeholder="Origin (e.g., Mumbai)"
          value={form.origin}
          onChange={handleChange}
          className="w-full bg-[#111410] border border-[#2f332d] rounded-lg p-2"
          required
        />

        {/* Destination */}
        <input
          name="destination"
          placeholder="Destination (e.g., Pune)"
          value={form.destination}
          onChange={handleChange}
          className="w-full bg-[#111410] border border-[#2f332d] rounded-lg p-2"
          required
        />

     <div className="flex justify-end pt-2">
  <button className="bg-[#2E7536] hover:bg-[#558953] px-6 py-2 rounded-lg font-medium">
    Confirm & Dispatch Trip
  </button>
</div>
      </form>
    </div>
  )
}
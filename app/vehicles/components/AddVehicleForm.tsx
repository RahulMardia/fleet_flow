'use client'

import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { Vehicle } from '../types'
import { supabase } from '@/lib/supabaseClient'

export default function AddVehicleForm({
  onAdd,
}: {
  onAdd: (v: Vehicle) => void
}) {
    const plateRegex = /^[A-Z]{2}\d{1,2}[A-Z]{1,3}\d{4}$/i

  const initialState: Vehicle = {
    license_plate: '',
    max_capacity: 0,
    odometer: 0,
    type: '',
    model: '',
    status: 'Available',
  }

  const [form, setForm] = useState<Vehicle>(initialState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target

    setForm(prev => ({
      ...prev,
      [name]:
        type === 'number'
          ? value === ''
            ? 0
            : Number(value)
          : value,
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onAdd(form)
    setForm(initialState)
  }

  const handleReset = () => {
    setForm(initialState)
  }
  const handleData = async () =>{
const { data: vehicles } = await supabase.from("vehicles").select();
  }
useEffect ( ()  => {
  handleData();

},[]) 
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1B1E19] rounded-2xl shadow-md border border-[#2a2d27] p-6 space-y-5 text-gray-100"
    >
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-[#E4BF1B]">
          New Vehicle Registration
        </h2>
        <p className="text-sm text-gray-400">
          Enter vehicle details to add into fleet
        </p>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* License Plate */}
        <div>
          <label className="block text-sm font-medium mb-1">
            License Plate *
          </label>
          <input
            name="license_plate"
            placeholder="e.g., GJ01AB1234"
            value={form.license_plate}
            onChange={handleChange}
            className="w-full bg-[#111410] border border-[#2f332d] rounded-lg p-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#558953]"
            required
          />
        </div>

        {/* Max Capacity */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Max Capacity (kg) *
          </label>
          <input
            name="max_capacity"
            type="number"
            placeholder="e.g., 500"
            value={form.max_capacity}
            onChange={handleChange}
            className="w-full bg-[#111410] border border-[#2f332d] rounded-lg p-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#558953]"
            required
          />
        </div>

        {/* Odometer */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Initial Odometer *
          </label>
          <input
            name="odometer"
            type="number"
            placeholder="e.g., 72000"
            value={form.odometer}
            onChange={handleChange}
            className="w-full bg-[#111410] border border-[#2f332d] rounded-lg p-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#558953]"
            required
          />    
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Vehicle Type *
          </label>
          <input
            name="type"
            placeholder="e.g., Truck / Van / Bike"
            value={form.type}
            onChange={handleChange}
            className="w-full bg-[#111410] border border-[#2f332d] rounded-lg p-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#558953]"
            required
          />
        </div>

        {/* Model */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Model *
          </label>
          <input
            name="model"
            placeholder="e.g., Tata Ace"
            value={form.model}
            onChange={handleChange}
            className="w-full bg-[#111410] border border-[#2f332d] rounded-lg p-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#558953]"
            required
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="bg-[#2E7536] hover:bg-[#558953] text-white px-5 py-2 rounded-lg font-medium transition"
        >
          Save Vehicle
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="bg-[#E4BF1B] hover:opacity-90 text-black px-5 py-2 rounded-lg font-semibold transition"
        >
          Clear
        </button>
      </div>
    </form>
  )
}
'use client'

import { useState } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export default function AddDriverModal({ open, onClose, onSubmit }: Props) {
  const [form, setForm] = useState({
    name: '',
    age: '',
    licenseNumber: '',
    expiry: '',
    licensePhoto: null as File | null,
  })

  if (!open) return null

  const handleChange = (e: any) => {
    const { name, value, files } = e.target
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    onSubmit(form)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1B1E19] w-full max-w-lg rounded-2xl p-6 border border-[#2a2d27] space-y-4"
      >
        <h2 className="text-xl font-semibold text-[#E4BF1B]">
          Register New Driver
        </h2>

        <input
          name="name"
          placeholder="Driver Name"
          onChange={handleChange}
          className="w-full bg-[#111410] border border-[#2f332d] rounded-md px-3 py-2"
          required
        />

        <input
          name="age"
          type="number"
          placeholder="Age"
          onChange={handleChange}
          className="w-full bg-[#111410] border border-[#2f332d] rounded-md px-3 py-2"
          required
        />

        <input
          name="licenseNumber"
          placeholder="License Number"
          onChange={handleChange}
          className="w-full bg-[#111410] border border-[#2f332d] rounded-md px-3 py-2"
          required
        />

        <input
          name="expiry"
          type="date"
          onChange={handleChange}
          className="w-full bg-[#111410] border border-[#2f332d] rounded-md px-3 py-2"
          required
        />

       <div className="space-y-1">
  <label className="block text-sm font-medium text-gray-300">
    Upload Driving Licence Image
  </label>

  <label className="flex items-center justify-center w-full cursor-pointer
    bg-[#E4BF1B] text-black font-semibold
    px-4 py-2 rounded-lg hover:opacity-90 transition">
    
    Choose File

    <input
      name="licensePhoto"
      type="file"
      accept="image/*"
      onChange={handleChange}
      className="hidden"
    />
  </label>
</div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-[#2f332d] rounded-md"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-[#2E7536] hover:bg-[#558953] px-5 py-2 rounded-md font-semibold"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
'use client'

import { useState } from 'react'

type Props = {
  onCreate: (data: any) => void
}

export default function ServiceForm({ onCreate }: Props) {
  const [form, setForm] = useState({
    vehicle: '',
    issue: '',
    date: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreate(form)
    setForm({ vehicle: '', issue: '', date: '' })
  }

  return (
    <div className="bg-[#1B1E19] rounded-2xl p-5 border border-[#2a2d27] w-full">
      <h2 className="text-[#E4BF1B] font-semibold mb-4">
        New Service
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="vehicle"
          placeholder="Vehicle Name"
          value={form.vehicle}
          onChange={handleChange}
          className="w-full bg-[#111410] border border-[#2f332d] rounded-lg p-2"
          required
        />

        <input
          name="issue"
          placeholder="Issue / Service"
          value={form.issue}
          onChange={handleChange}
          className="w-full bg-[#111410] border border-[#2f332d] rounded-lg p-2"
          required
        />

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="w-full bg-[#111410] border border-[#2f332d] rounded-lg p-2"
          required
        />

        {/* buttons right aligned */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="submit"
            className="bg-[#2E7536] hover:bg-[#558953] px-4 py-2 rounded-lg"
          >
            Create
          </button>

          <button
            type="button"
            className="border border-red-400 text-red-400 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
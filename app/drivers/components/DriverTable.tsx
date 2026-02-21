import { Driver } from '../types'

type Props = {
  drivers: Driver[]
  onAddClick: () => void
}

export default function DriverTable({ drivers, onAddClick }: Props) {
  return (
    <div className="bg-[#1B1E19] rounded-2xl border border-[#2a2d27] overflow-hidden">

      {/* 🔹 Top Bar */}
      <div className="px-4 py-3 border-b border-[#2a2d27] flex items-center gap-3">
        <h2 className="text-[#74A8BA] font-semibold">
          Fleet Flow
        </h2>

        <input
          placeholder="Search bar..."
          className="flex-1 bg-[#111410] border border-[#2f332d] rounded-md px-3 py-1 text-sm"
        />

        <button
          onClick={onAddClick}
          className="bg-[#E4BF1B] text-black px-4 py-1 rounded-md font-semibold hover:opacity-90"
        >
          + Add Driver
        </button>
      </div>

      {/* 🔹 Table */}
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[#E66A6A] border-b border-[#2a2d27]">
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">License#</th>
            <th className="p-3 text-left">Expiry</th>
            <th className="p-3 text-left">Completion Rate</th>
            <th className="p-3 text-left">Safety Score</th>
            <th className="p-3 text-left">Complaints</th>
          </tr>
        </thead>

        <tbody>
          {drivers.map((d, index) => (
            <tr
              key={d.id}
              className="border-b border-[#2a2d27] hover:bg-[#232620]"
            >
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{d.name}</td>
              <td className="p-3">{d.licenseNumber}</td>
              <td className="p-3">{d.expiry}</td>
              <td className="p-3">{d.completionRate}%</td>
              <td className="p-3">{d.safetyScore}%</td>
              <td className="p-3">{d.complaints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
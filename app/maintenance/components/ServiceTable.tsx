import { Service } from '../types'

type Props = {
  services: Service[]
}

export default function ServiceTable({ services }: Props) {
  return (
    <div className="bg-[#1B1E19] rounded-2xl border border-[#2a2d27] overflow-hidden">
      
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#2a2d27]">
        <h2 className="text-[#74A8BA] font-semibold">
          Fleet Flow
        </h2>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-[#E66A6A] border-b border-[#2a2d27]">
            <th className="p-3 text-left">Log ID</th>
            <th className="p-3 text-left">Vehicle</th>
            <th className="p-3 text-left">Issue/Service</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Cost</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {services.map((s, index) => (
            <tr
              key={s.id}
              className="border-b border-[#2a2d27] hover:bg-[#232620]"
            >
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{s.vehicle}</td>
              <td className="p-3">{s.issue}</td>
              <td className="p-3">{s.date}</td>
              <td className="p-3">{s.cost}</td>
              <td className="p-3 text-green-400">{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
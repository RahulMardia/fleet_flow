type Trip = {
  id: string
  vehicle: string
  driver: string
  origin: string
  destination: string
  status: string
}

export default function TripTable({ trips }: { trips: Trip[] }) {
  return (
    <div className="bg-[#1B1E19] rounded-2xl p-6 border border-[#2a2d27] w-full">

      {/* 🔹 Top Bar */}
      <div className="px-4 py-3 border-b border-[#2a2d27] flex items-center gap-3">
        <h2 className="text-[#74A8BA] font-semibold">
          Fleet Flow
        </h2>

        <input
          placeholder="Search bar..."
          className="flex-1 bg-[#111410] border border-[#2f332d] rounded-md px-3 py-1 text-sm"
        />
      </div>

      {/* 🔹 Table ALWAYS visible */}
      <table className="w-full text-sm">

        {/* ✅ Header always shown */}
        <thead>
          <tr className="text-[#E66A6A] border-b border-[#2a2d27]">
            <th className="p-3 text-left">Trip</th>
            <th className="p-3 text-left">Fleet Type</th>
            <th className="p-3 text-left">Origin</th>
            <th className="p-3 text-left">Destination</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {trips.length === 0 ? (
            /* ✅ Empty state row but header stays */
            <tr>
              <td
                colSpan={5}
                className="p-6 text-center text-gray-500"
              >
                — No records yet —
              </td>
            </tr>
          ) : (
            trips.map((t, i) => (
              <tr
                key={t.id}
                className="border-b border-[#2a2d27] hover:bg-[#232620] transition"
              >
                {/* ✅ Serial number like roll no */}
                <td className="p-3">{i + 1}</td>
                <td className="p-3">{t.vehicle}</td>
                <td className="p-3">{t.origin}</td>
                <td className="p-3">{t.destination}</td>
                <td className="p-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-900/40 text-yellow-300">
                    {t.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}   
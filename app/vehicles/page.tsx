"use client";

import { useEffect, useState } from "react";
import { Vehicle } from "./types";
import AddVehicleForm from "./components/AddVehicleForm";
import VehicleTable from "./components/VehicleTable";
import { supabase } from "@/lib/supabaseClient";

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    const handleData = async () =>{
const { data: vehicles } = await supabase.from("vehicles").select();
console.log("Data=>",vehicles);
setVehicles(vehicles || []);
setLoading(false)
  }

useEffect ( ()  => {
  handleData();

},[]) 

  const handleAddVehicle = (vehicle: Vehicle) => {
    setVehicles((prev) => [...prev, vehicle]);
  };

  return (
    <div className="p-6 space-y-6 min-h-screen bg-[#0f1210] text-gray-100">
      <h1 className="text-2xl font-bold text-white">Vehicle Registry</h1>

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
          🔄 Loading vehicles...
        </div>
      ) : (
        <>
          <AddVehicleForm onAdd={handleAddVehicle} />
          <VehicleTable vehicles={vehicles} />
        </>
      )}
    </div>
  );
}
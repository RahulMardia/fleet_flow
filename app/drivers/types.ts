export type Driver = {
  id: string
  name: string
  age: number
  licenseNumber: string
  expiry: string
  completionRate: number
  safetyScore: number
  complaints: number
  licensePhoto?: File | null
}
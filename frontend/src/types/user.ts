export type Role = 'admin' | 'staff' | 'customer'

export interface User {
  id: string
  name: string
  role: Role
}

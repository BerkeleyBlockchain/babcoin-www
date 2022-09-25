export interface AttendedEvents {
  endTimestamp: number
  imageUrl: string
  name: string
  nftId: number
  qrCodeUrl: string
  startTimestamp: number
  type: EventType
  weight: number
  __v: number
  _id: number
}

export interface AttendEventRequest {
  address: string
  eventId: string
}

export interface CreateUserRequest {
  name: string
  email: string
  address: string
  role: Role
}

type Role = 'admin' | 'user'

export interface Event {
  id: any
  endTimestamp: number
  imageUrl: string
  name: string
  nftId: number
  qrCodeUrl: string
  startTimestamp: number
  type: EventType
  location: string
  weight: number
  __v: number
  _id: number
}

export type EventType = 'clubcensus'

export interface IdToEventMap {
  [key: string]: Event
}

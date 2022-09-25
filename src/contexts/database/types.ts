export interface AttendedEvents {
  __v: number
  _id: number
  description: string
  endTimestamp: number
  imageUrl: string
  isMinted: boolean
  location: string
  name: string
  nftArtUrl: string
  nftId: number
  password: string
  qrCodeUrl: string
  startTimestamp: number
  type: EventType
  weight: number
}

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
  description: string
  __v: number
  _id: number
}

export type EventType = 'clubcensus' | 'allhands' | 'external'

export interface IdToEventMap {
  [key: string]: Event
}

export interface Requirement {
  _id: string
  type: EventType
  amount: number
}

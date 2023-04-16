export type ActionType = 'inspection'|'maintenance'|'repair'

export interface Action {
	description?: string
	entity?: unknown
	name: string
	type: ActionType
	ttl?: number
}

export interface Asset {name: string, id: number, unit?: number}
export interface LogEntry {assetId: number, date: string, type: ActionType}
import type { ActionType } from "./schema"

export function getActionTypeEmoji(type: ActionType) {
    switch(type) {
        case 'inspection' :
            return '🔍'
            break
        case 'maintenance':
            return '🛠️'
            break
        case 'repair':
            return '🧰'
            break
        default:
            return '⁉'
    }
}
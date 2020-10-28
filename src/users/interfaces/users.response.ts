export interface UserResponse {
    id : string 
    username : string 
    email  : string
    isActive ?: boolean
    created ?: Date
    updated ?: Date
    deleted ?: Date
    token ?: string
}
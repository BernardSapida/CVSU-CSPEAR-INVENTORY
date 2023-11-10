type Admin = {
    firstname: string,
    lastname: string
}

type UserRole = 'USER' | 'ADMIN';
type TableType = 'CRUD' | 'CATALOG' | 'REQUEST' | 'VIEW-REQUEST';
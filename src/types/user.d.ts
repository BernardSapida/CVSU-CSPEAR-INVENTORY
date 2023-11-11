type Role = 'Student' | 'Faculty' | 'Admin';
type College = 'CED' | 'CEMDS' | 'CEIT' | 'CON' | 'CSPEAR' | 'CVMBS' | 'COM';
type TableType = 'CRUD' | 'CATALOG' | 'REQUEST' | 'VIEW-REQUEST';
type Condition = "Good" | "Misplaced" | "Damaged";
type BorrowStatus = "Pending" | "ToPickup" | "PickedUp" | "Returned";

type User = {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    role: Role,
    college: College,
}
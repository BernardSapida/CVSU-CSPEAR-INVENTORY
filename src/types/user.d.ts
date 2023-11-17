type Role = 'Student' | 'Faculty' | 'Admin' | 'UNKNOWN';
type College = 'CAFENR' | 'CAS' | 'CCJ' | 'CED' | 'CEMDS' | 'CEIT' | 'CON' | 'CSPEAR' | 'CVMBS' | 'COM' | 'UNKNOWN';
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
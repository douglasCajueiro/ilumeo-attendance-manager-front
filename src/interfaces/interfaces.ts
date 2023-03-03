export interface EmployeeHistoryDB {
    workDays: workDay[]
    id: string
}

export interface EmployeeHistoryStorage extends Array<workDay> {}

export interface workDay {
    id: string,
    employee_id: string,
    work_day_start: string,
    work_day_end: string
}

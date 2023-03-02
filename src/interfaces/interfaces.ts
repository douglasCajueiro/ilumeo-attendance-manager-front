export interface EmployeeHistory {
    workDays: workDay[]
    id: string
}

export interface workDay {
    id: string,
    employee_id: string,
    work_day_start: string,
    work_day_end: string
}

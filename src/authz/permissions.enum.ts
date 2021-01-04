// i like keeping the same structure in the enums as in the permissions which
// is why i split them into <action>.<subject> (e.g. Read.Budgets) instead of
// <subject>.<action> (e.g. Budgets.Read)

export enum Read {
    Budgets = 'read:budgets',
    Expenses = 'read:expenses',
}

export enum Write {
    Budgets = 'write:budgets',
    Expenses = 'write:expenses',
}

export enum Update {
    Budgets = 'update:budgets',
    Expenses = 'update:expenses',
}

export enum Remove {
    Budgets = 'delete:budgets',
    Expenses = 'delete:expenses',
}

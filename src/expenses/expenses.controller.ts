import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common'
import {AuthGuard} from '@nestjs/passport'
import {Permissions} from '../authz/permissions.decorator'
import {Read, Remove, Update, Write} from '../authz/permissions.enum'
import {PermissionsGuard} from '../authz/permissions.guard'
import {ExpenseDto} from './expense.dto'
import {Expense} from './expense.schema'
import {ExpensesService} from './expenses.service'

@Controller('expenses')
export class ExpensesController {
    constructor(private readonly expensesService: ExpensesService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions(Read.Expenses)
    async findByDateRange(@Query('startDate') startDate: Date, @Query('endDate') endDate: Date): Promise<Expense[]> {
        return await this.expensesService.findByDateRange(startDate, endDate)
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions(Read.Expenses)
    async find(@Param('id') id: string): Promise<Expense> {
        return await this.expensesService.find(id)
    }

    @Post()
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions(Write.Expenses)
    async create(@Body('expense') expense: ExpenseDto): Promise<Expense> {
        return await this.expensesService.create(expense)
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions(Update.Expenses)
    async update(@Param('id') id: string, @Body('expense') expense: ExpenseDto): Promise<Expense> {
        return await this.expensesService.update(id, expense)
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions(Remove.Expenses)
    async delete(@Param('id') id: string): Promise<Expense> {
        return await this.expensesService.delete(id)
    }

    @Post('batch')
    //@UseGuards(AuthGuard('jwt'), PermissionsGuard)
    //@Permissions('admin')
    async batch(@Body() expenses: ExpenseDto[]): Promise<any> {
        return await this.expensesService.batchInsert(expenses)
    }
}

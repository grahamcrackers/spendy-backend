import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common'
import {AuthGuard} from '@nestjs/passport'
import {Permissions} from '../authz/permissions.decorator'
import {PermissionsGuard} from '../authz/permissions.guard'
import {Read, Update, Write, Remove} from '../authz/permissions.enum'
import {BudgetDto} from './budget.dto'
import {Budget} from './budget.schema'
import {BudgetsService} from './budgets.service'

@Controller('budgets')
export class BudgetsController {
    constructor(private readonly budgetsService: BudgetsService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions(Read.Budgets)
    async findAll(): Promise<Budget[]> {
        return await this.budgetsService.findActive()
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions(Read.Budgets)
    async find(@Param('id') id: string): Promise<Budget> {
        return await this.budgetsService.find(id)
    }

    @Post()
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions(Write.Budgets)
    async create(@Body('budget') budget: BudgetDto): Promise<Budget> {
        return await this.budgetsService.create(budget)
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions(Update.Budgets)
    async update(@Param('id') id: string, @Body('budget') budget: BudgetDto): Promise<Budget> {
        return await this.budgetsService.update(id, budget)
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions(Remove.Budgets)
    async delete(@Param('id') id: string): Promise<Budget> {
        return await this.budgetsService.delete(id)
    }

    @Post('batch')
    //@UseGuards(AuthGuard('jwt'), PermissionsGuard)
    //@Permissions('admin')
    async batch(@Body() budgets: BudgetDto[]): Promise<any> {
        return await this.budgetsService.batchInsert(budgets)
    }
}

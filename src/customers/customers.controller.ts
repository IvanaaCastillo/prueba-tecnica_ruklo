import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}

    @Post()
    create(@Body() body: CreateCustomerDto) {
        return this.customersService.create(body);
    }

    @Get()
    findAll(@Query() query: any) {
        return this.customersService.findAll(query);
    }
}
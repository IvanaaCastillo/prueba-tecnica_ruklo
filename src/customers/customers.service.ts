import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomersService {
    constructor(private prisma: PrismaService) {}

    // NORMALIZADORES
    private normalizeName(name: string): string {
        return name?.trim() || '';
    }

    private normalizeEmail(email: string) {
        return email?.trim().toLowerCase() || '';
    }

    private normalizePhone(phone: string) {
        return phone
            ? phone.replace(/\s/g, '')
            .replace(/\(/g, '')
            .replace(/\)/g, '')
            .replace(/-/g, '')
            : '';
        }

    private normalizeDni(dni: string) {
        return dni?.trim().toUpperCase() || '';
    }

    // CREATE

    async create(data: any) {
        return this.prisma.customer.create({
            data: {
                name: this.normalizeName(data.name),
                email: this.normalizeEmail(data.email),
                phone: this.normalizePhone(data.phone),
                dni: this.normalizeDni(data.dni),
            },
        });
    }

    // FIND

    async findAll(query: any) {
        const orConditions: any[] = [];

        if (query.email) {
        orConditions.push({
            email: this.normalizeEmail(query.email),
        });
        }

        if (query.phone) {
        orConditions.push({
            phone: this.normalizePhone(query.phone),
        });
        }

        if (query.dni) {
        orConditions.push({
            dni: this.normalizeDni(query.dni),
        });
        }

        return this.prisma.customer.findMany({
        where: orConditions.length ? { OR: orConditions } : {},
        });
    }
}
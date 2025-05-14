import { PrismaClient } from '@prisma/client'
import { config } from '../config'

const prisma = new PrismaClient({
  datasourceUrl: config.database.url
});

export { prisma } 
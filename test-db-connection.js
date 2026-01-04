const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function test() {
  console.log('Testing database connection...')
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET')
  
  try {
    const count = await prisma.user.count()
    console.log('Total users:', count)
    
    const users = await prisma.user.findMany({
      select: { email: true }
    })
    console.log('User emails:', users.map(u => u.email))
    
    const specific = await prisma.user.findUnique({
      where: { email: 'admin@5cms.com' }
    })
    console.log('Admin user found:', specific ? 'YES' : 'NO')
  } catch (error) {
    console.error('Error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

test()
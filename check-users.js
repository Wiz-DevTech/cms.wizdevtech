const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany({
    include: { role: true }
  })
  
  console.log('Users in database:', users.length)
  users.forEach(user => {
    console.log(`- ${user.email} (${user.role.name})`)
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
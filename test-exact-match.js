const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({ log: ['query'] })

async function test() {
  const testEmail = 'admin@5cms.com'
  
  console.log('Looking for:', testEmail)
  console.log('Email length:', testEmail.length)
  console.log('Email bytes:', Buffer.from(testEmail).toString('hex'))
  
  const user = await prisma.user.findUnique({
    where: { email: testEmail }
  })
  
  console.log('Found:', user ? 'YES' : 'NO')
  
  if (!user) {
    const all = await prisma.user.findMany({ select: { email: true } })
    console.log('\nAll emails in DB:')
    all.forEach(u => {
      console.log(`  "${u.email}" (length: ${u.email.length})`)
    })
  }
  
  await prisma.$disconnect()
}

test()

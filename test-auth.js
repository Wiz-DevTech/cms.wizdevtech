const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function testAuth() {
  const email = 'admin@5cms.com'
  const password = 'admin123'
  
  console.log('Testing authentication for:', email)
  console.log('Password attempting:', password)
  console.log('')
  
  // Find the user
  const user = await prisma.user.findUnique({
    where: { email },
    include: { role: true }
  })
  
  if (!user) {
    console.log('❌ User not found!')
    return
  }
  
  console.log('✅ User found:', {
    id: user.id,
    email: user.email,
    name: user.name,
    isActive: user.isActive,
    role: user.role.name
  })
  console.log('')
  
  // Check password
  console.log('Stored hash:', user.password)
  console.log('')
  
  const isValid = await bcrypt.compare(password, user.password)
  console.log('Password comparison result:', isValid ? '✅ VALID' : '❌ INVALID')
  
  // Try with bcrypt v10 rounds (in case of mismatch)
  const testHash = await bcrypt.hash(password, 10)
  console.log('')
  console.log('Test hash with rounds=10:', testHash)
  const testCompare = await bcrypt.compare(password, testHash)
  console.log('Test hash validates:', testCompare ? '✅ YES' : '❌ NO')
}

testAuth()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
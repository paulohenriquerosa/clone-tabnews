const nextJest = require('next/jest')
const dotenv = require('dotenv')

// Uma forma de carregar as variaveis de ambiente test segundo a documentação do next
// const { loadEnvConfig } = require('@next/env')
// loadEnvConfig(process.cwd())
//

dotenv.config({
  path: '.env.development'
})

const createJestConfig = nextJest({
  dir: '.',
})
const jestConfig = createJestConfig({
  moduleDirectories: ['node_modules', '<rootDir>'],
})

module.exports = jestConfig

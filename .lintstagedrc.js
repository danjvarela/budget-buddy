const path = require('path')

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

module.exports = {
  '**/*.{ts,tsx}': [
    'prettier --write',
    buildEslintCommand,
    () => 'tsc -p tsconfig.json --noEmit',
  ],
  '**/*.{js,jsx}': ['prettier --write', buildEslintCommand],
  '**/*.{css,html,json,md,yaml,scss}': ['prettier --write'],
}

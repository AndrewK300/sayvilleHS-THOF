const fs = require('fs')

const raw = JSON.parse(fs.readFileSync('inductees.raw.json', 'utf8'))

const transformed = raw.map(row => ({
  _type: 'inductee',
  firstName: capitalize(row['FIRST-NAME']),
  lastName: capitalize(row['LAST-NAME']),
  year: Number(row['INDUCTEE-YEAR'])
}))

function capitalize(str) {
  return str
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase())
}

fs.writeFileSync(
  'inductees.sanity.json',
  JSON.stringify(transformed, null, 2)
)

console.log('✅ inductees.sanity.json created')

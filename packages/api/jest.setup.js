const dotenv = require('dotenv')
const path = require('path')

module.exports = () => {
  dotenv.config({ path: path.resolve(__dirname, '.env') })
}

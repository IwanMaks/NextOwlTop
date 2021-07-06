// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const withReactSvg = require('next-react-svg')
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const path = require('path')

// eslint-disable-next-line no-undef
module.exports = withReactSvg({
    // eslint-disable-next-line no-undef
    include: path.resolve(__dirname, 'public'),
    webpack(config, options) {
        return config
    }
})
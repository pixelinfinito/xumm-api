const ipRange = require("ip-range-check")

module.exports = async function (expressApp) {
  expressApp.use((req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    req.remoteAddress = ip
    req.ipTrusted = ipRange(ip, req.config.ips || "127.0.0.1") || ipRange(ip, [ "127.0.0.1/32", "::1" ])
    next()
  })
}

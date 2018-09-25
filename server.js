const liveServer = require('live-server')

liveServer.start({
  port: 393,
  watch: ['lib', 'docs', 'themes']
})

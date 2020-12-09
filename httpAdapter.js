
function httpAdapter(controller) {
  return (req, res) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent')
      }
    }
    controller(httpRequest)
      .then(httpResponse => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers)
        }
        if (httpResponse.body) {
          res.type('json')
          res.status(httpResponse.statusCode).send(httpResponse.body)
        }
        else {
          res.status(httpResponse.statusCode).end(httpResponse.end)
        }
      })
      .catch(e => {
        res.status(status.ServerError).send({ error: 'An unkown error occurred.' })
      })
  }
}
module.exports = { httpAdapter }

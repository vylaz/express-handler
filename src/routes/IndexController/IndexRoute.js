module.exports = {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return h.send("Hello World!")
    }
}
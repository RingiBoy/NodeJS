module.exports = (err, req, res, next)=>{
    res.status(err.status || 500)
    .json({
        message:err.message || 'server error eprst',
        status: 'from mainHandler'
    })
}
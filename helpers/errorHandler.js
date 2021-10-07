const errorHandler = (err,req,res,next) => {
    if(err.name === 'UnauthorizedError'){
        res.status(401).json({message:'the user is unauthorized'})
    }
    if(err.name === 'ValidationError'){
        res.status(401).json({message: err})
    }
    res.status(500).json(err)
}
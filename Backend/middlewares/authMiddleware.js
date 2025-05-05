const jwt=require('jsonwebtoken')

const authMiddleware=async(req,res,next)=>{
    try {
        const authHeader=req.headers.authorization

        if(!authHeader){
            return res.status(401).json({message:"Unauthorized"})
        }

        const token=authHeader.split(' ')[1]

        const payload=await jwt.verify(token,process.env.JWT_SECRET_KEY)

        req.user=payload

        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({message:"Unauthorized"})
    }
}

module.exports=authMiddleware
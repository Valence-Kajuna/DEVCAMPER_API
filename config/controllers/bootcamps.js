//@desc     Get all bootcamps
//@Method   Get
//@route    /api/v1/bootcamps
//@access   Public
exports.getBootcamps = (req,res,next) =>{
    res.status(200).json(
        {
            "success":true,
            "msg": "Show all bootcamps"
        }
    )
}

//@desc     Get single bootcamp
//@Method   Get
//@route    /api/v1/bootcamps/:id
//@access   Public
exports.getBootcamp = (req,res,next) =>{
    res.status(200).json(
        {
            "success": true,
            "msg": `Bootcamp with id ${req.params.id}`
        }
    )   
}

//@desc     Create new bootcamp
//Method    Post
//@route    /api/v1/bootcamps
//@access   Public
exports.createBootcamp = (req,res,next) =>{
    res.status(200).json(
        {
            "success": true,
            "msg": `Created a new bootcamp`
        }
    )
    
}

//@desc     Edit a bootcamp
//@Method   Put
//@route    /api/v1/bootcamps:/id
//@access   Public
exports.editBootcamp = (req,res,next) =>{
    res.status(200).json(
        {
            "success": true,
            "msg": `Edited bootcamp with id ${req.params.id}`
        }
    )
}

//@desc     Get all bootcamps
//@Method   Delete
//@route    /api/v1/bootcamps/:id
//@access   Public
exports.deleteBootcamp = (req,res,next) =>{
    res.status(200).json(
        {
            "success": true,
            "msg": `Deleted bootcamp ${req.params.id}`
        }
    )
}
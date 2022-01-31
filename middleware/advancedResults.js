const advancedResults = (model, populate) => async (req, res, next) =>{
    let query;

    // Creating a copy of a query object
    reqQuery = {...req.query}

    //Create a remove fields array
    const removeFields = ['select', 'sort', 'page', 'limit']
    
    // Remove the fields from the copy
    removeFields.forEach(field => delete reqQuery[field])
    
    // Creating a string version of a query object
    let queryStr = JSON.stringify(reqQuery)

    // Making mongo operatiors like $lt, $gt, $in etc
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

    // Querying with filters
    query = model.find(JSON.parse(queryStr));

    if(populate){
        query.populate(populate);
    }

    // Implemented the select query
    if (req.query.select){
        var selectFields = req.query.select.split(',').join(' ');
        query.select(selectFields)
    }

    // Implementing the sort query
    if (req.query.sort) {
        var sortFields = req.query.sort.split(',').join(' ');
        query.sort(sortFields);
    }

    // Implementing pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 1;
    const startIndex = (page-1)* limit;
    const total = await model.count();
    const endIndex = page * limit;

    query.skip(startIndex).limit(limit)

    pagination = {};

    if(startIndex>0){
        pagination.previous = {previous : page-1, limit: limit}
    }

    if(endIndex < total){
        pagination.next = {next: page +1, limit: limit}
    }

    const results = await query;

    res.advancedResults ={
            success: true,
            count : results.length,
            pagination,
            data: results
        }

    next();

}

module.exports =  advancedResults;
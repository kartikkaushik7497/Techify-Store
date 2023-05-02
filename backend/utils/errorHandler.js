class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);  //Calling super class(i.e Error class) Constructor
        this.statusCode = statusCode; //calling Constructor ErrorHandler classs

        Error.captureStackTrace(this,this.constructor); //Using Error class pre-Built methods
    }
}

module.exports = ErrorHandler;
class ApiFeatures {
  constructor(query, queryStr) {
    //query is Like Product.find()
    //queryStr is query String like keyword = Samosa
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? //Taking keyword value and searching using regex
        //regex a method for using mongo functions or properties inside brackets or javascript
        {
          name: {
            //searching name
            $regex: this.queryStr.keyword,
            $options: "i", //Case insensitve A OR a are equal
          },
        }
      : {};

    // console.log(keyword);

    //Taking keyword from above and Searching
    this.query = this.query.find({ ...keyword }); //{{ ...keyword }} means passing value not refrence
    //passing refrence change original values if copied values are changed!!!!
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    //Removing uneccesary Fields for Category filteration like pages,keyword(names)

    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);
    
    //Filter for Price and Rating

    let queryStr = JSON.stringify(queryCopy); //Stringify to convert objects into string types
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }
  pagination(resultPerPage){
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;

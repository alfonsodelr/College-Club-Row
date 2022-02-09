Description: this file should work as a temporary documentation file. 

1. every functions or class should be created with template:
                                                    /*!
                                                    * @desc  object description
                                                    * @param  {} required params   
                                                    * @return {} expected return value   
                                                    */

----------------------------Auth----------------------------------
1. pages that mush authenticate users: 
    A. /club:  any pages onder this folder is intended to provide service for club officers and advisors. Have to check for user roles. 

----------------------------Dynamo DB----------------------------------
1. all DDB commands should return either a  {response.data, params} or a typeOf {Error, params}

2. user 'docker run --name mydynamo -p 8000:8000 amazon/dynamodb-local' to run local db.

3. run database contaier by:  docker-compose up -d dynamodb && docker logs -f my-dynamodb

4. Error:
    A. Error ValidationException: The number of conditions on the keys is invalid.
        this error occur when the keys of table doesn't match, check if the keys and tableName is correct.
    B. Error ValidationException: The provided expression refers to an attribute that does not exist in the item
        this error occured when api is tring to update a db column that doesn't exist.

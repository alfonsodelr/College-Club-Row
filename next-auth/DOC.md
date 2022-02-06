Description: this file should work as a temporary documentation file. 

----------------------------Auth----------------------------------
1. pages that mush authenticate users: 
    A. /club:  any pages onder this folder is intended to provide service for club officers and advisors. Have to check for user roles. 

----------------------------Dynamo DB----------------------------------
1. all DDB commands should return either a  {response.data, params} or a typeOf {Error, params}

2. user 'docker run --name mydynamo -p 8000:8000 amazon/dynamodb-local' to run local db.

3. run database contaier by:  docker-compose up -d dynamodb && docker logs -f my-dynamodb
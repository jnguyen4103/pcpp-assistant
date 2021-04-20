## Axios code
const config = {
    headers: { Authorization: 'Bearer ${token}' }
};

const bodyParameters = {
   key: "value"
};

Axios.post( 
  'http://localhost:8000/url/to/something',
  bodyParameters,
  config
).then(console.log).catch(console.log);

- not all apis will need both config or bodyParameters
- post functions must always include bodyParameters

## Using local storage to keep tokens
NOTE: this should be done in javascript on the frontend
link: https://www.w3schools.com/htmL/html5_webstorage.asp
code:
// Store
localStorage.setItem("lastname", "Smith");

// Retrieve
document.getElementById("result").innerHTML = localStorage.getItem("lastname");

## Django
NOTE: the ip will need to be changed when we go to production

## User management
### /auth/register/
this registers a new user with the givien information. no fields are optional

POST: http://127.0.0.1:8000/auth/register/

body = {  
    email: 'sample@sample.com'  
    username: 'sample'  
    password: '12345password'  
    password2: '12345password'  
    first_name: 'test'  
    last_name: 'test'  
}

### /auth/login/
logs the user in. all fields are required

POST: http://127.0.0.1:8000/auth/login/

body = {  
    username: 'sample'  
    password: '12345password'  
}  

returns:  
{  
    "refresh": "theKey",  
    "access": "theKey"  
}  

Note: access is the key that you need for accessing restricted pages and is what replaces 'token' in  
    const config = {  
        headers: { Authorization: 'Bearer ${token}' }  
    };  

### /auth/logout/
logs the user out. all fields required. frontend should also delete refresh and access from local storage.

POST: http://127.0.0.1:8000/auth/logout/

body = {  
    refresh: 'theKey'  `this is the refresh token you get from login`  
}  

config = {  
    headers: { Authorization: 'Bearer ${token}' } `token is the access key from login`  
};  

### /auth/login/refresh/
gets a new access token for the user

POST: http://127.0.0.1:8000/auth/login/refresh/

body = {  
    refresh: 'theKey'  `this is the refresh token you get from login`  
}  
 
returns:  
{  
    "access": "theKey"  
}  

OR  
{  
    "detail": "Token is blacklisted",  
    "code": "token_not_valid"  
}  
if refresh token has expired or user has been logged out  

## PCPP

### /pcpp/savepc/
saves the pc to specified user. the part IDs can either be its ID or full name. name is the name the user chooses for the pc

NOTE: the priority of who it is saved to is: access key > email > userID
One of those 3 must be included

POST: http://127.0.0.1:8000/pcpp/savepc/

body = {  
    CPUid: "4446"  
    GPUid: "2324"  
    caseid: "3233"  
    mboardid: "5277"  
    memoryid: "Corsair Vengeance LPX 32 GB (2 x 16 GB) DDR4-3200 CL16 Memory" `full name example`  
    powerid: "7624"  
    userid: "1"  
    name: "test1234"  
    email: "sample@sample.com"  
}  

config = {  
    headers: { Authorization: 'Bearer ${token}' } `token is the access key from login`  
};

### /pcpp/getpc/
returns the logged in users pcs

NOTE: this is a http GET and not a POST

GET: http://127.0.0.1:8000/pcpp/getpc/

config = {  
    headers: { Authorization: 'Bearer ${token}' } `token is the access key from login`  
};

// Fetch API requires a discussion of ...
// Callbacks, Promises, Thenables and Async/Await ...

// ==========================================================================

// CALLBACKS
function callBack(parameter, callback) {
        // Code for the parameter.
        callback();
}

// ==============

// CallBack Hell
function One(parameter, callback) {
        // Do stuff ...
        function Two(parameter, callback) {
                // Do stuff ...
                function Three(parameter, callback) {
                        // Do stuff ...
                        function Four(parameter, callback) {
                                // Do stuff ...
                                function Five(parameter, callback) {
                                        console.log('Call back Hell ... ')
                                }
                        }
                }
        }
}

// ==============

// Promises
// Promises have 3 States => resolve(Fulfilled), reject and pending
const myFirstPromise = new Promise(function(resolve, reject) {
        const error = false;
        if(!error) {
                resolve('Yeeehh, it worked ...')
        } else {
                reject('Sorry, There\'s a problem ...')
        }
})

console.log(myFirstPromise);

myFirstPromise
        // .then((value) => { console.log(value) })
        .then((value) => { return value + ' ' + 1; })
        .then((newValue) => { console.log(newValue) })
        .catch((err) => { console.error(err) })


const mySecondPromise = new Promise(function(resolve, reject) {
        setTimeout(function() {
                resolve('At last, it has worked out ...');
        }, 3000);
});

mySecondPromise.then((value) => { console.log(value) });
myFirstPromise.then(value => { console.log(value) });

// ==============

// Using the Fetch API
const users = fetch('https://jsonplaceholder.typicode.com/users'); // Fecth API (fetch()) returns a promise.
console.log(users);
users
        .then(response => {
                console.log(response);
                return response.json();
        })
        .then(data => { 
                console.log(data);
                data.forEach(user => {
                        console.log(user)
                });
        })
        .catch(err => console.error(err));

console.log(users)
        

// ==========================================================================

// Async Await

// Getting Users' data
const myUser = {
        userList: []
}

const myCoolFunction = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const jsonResponse = await response.json();
        
        return jsonResponse;
}

const anotherFunction = async () => { 
        let data = await myCoolFunction();
        console.log(data);
        myUser.userList.push(data);
        console.log(myUser);
}

const getUserEmails = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const jsonResponse = await response.json();
        const userEmailArray = jsonResponse.map((user) => { 
                return user.email;
        });
        console.log(userEmailArray)
}

anotherFunction();
getUserEmails();

// Getting Daddy Jokes
// 2nd Parameter of the Fetch function is an object. With the GET Verb/Method
const getDadJokes = async () => {
        const response = await fetch('https://icanhazdadjoke.com', { 
                method: 'GET',
                headers: {
                        Accept: 'application/json'
                }
        });
        let dadJokes = await response.json();
        // return dadJokes
        console.log(dadJokes);
}

// Posting something on the server.
// 2nd Parameter of the Fetch function is an object. With the POST Verb/Method
const postObject = {
        "id": "fNmOm3Ediyd",
        "joke": "I am Falling for JavaScript."
}

const postData = async (postJoke) => { 
        const response = await fetch('https://httpbin.org/post', {
                method: 'POST',
                hesders: {
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify(postJoke)
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse)
}

const requestJoke = async (firstname, lastname) => { 
        const response = await fetch(`http://api.icndb.com/jokes/random?firstName=${firstname}&lastName=${lastname}`);
        const jsonResponse = await response.json();
        console.log(jsonResponse.value.joke)
}

getDadJokes();
postData(postObject);
requestJoke('Atwiine', 'Stephen')
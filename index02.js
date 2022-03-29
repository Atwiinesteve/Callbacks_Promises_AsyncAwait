// ==================================================================

// CALLBACKS IN JAVASCRIPT.

// ==================================================================

// In JavaScript, functins are first class objects.
// Just like an object, a function can be passed as an argument to another function.
// A function can also be returned as values from other functions.
// Any function that is passed as an argument to another function is called a CALLBACK FUNCTION.
// The function which accepts a function as an argument or returns a function is called a HIGHER ORDER FUNCTION.


function greet(name) {
        console.log(`Hello ${name}`);
}

function greetSteve(greetFunction) {
        const name = 'Steve';
        return greetFunction(name);
}
greetSteve(greet);

function greet(name) {
        console.log(`Hi ${name}`);
}

function higherOrderFunction(callbackFunction) {
        const name = 'Atwiine Stephen';
        callbackFunction(name)
}
higherOrderFunction(greet);

// =====================

// WHY WE NEED CALLBACKS.

// A Synchronous Callbacks.
// A callback which is executed immediately is called a synchronous callback.
// A callback function defines the logic a higherOrderFunction will have to execute.

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
numbers.sort((a, b) => a - b);
numbers.map(n => n*2);
numbers.filter(n => n%2 === 0);

// Asynchronous Callbacks.
// It is function that is often used to continue or resume code execution after an synchronous operation has stopped/completed.
// Callback are used to delay the execution of a function until a particular time or event has passed or occurred respectively.
// Data fetching takes time and we can only run the function we want to after the data has been fetched and not immediately.

// Asynchronous Callbacks examples.
//  ==> Timers.
function greet(name) {
        console.log(`Hello ${name}`);
}
setTimeout(greet, 3000, 'Kiiza Atwiine Stephen');

//  ==> EventListeners.
function greetUser() {
        document.getElementById('demo').innerHTML = 'Hello Stephen';
}
document.getElementById('#nameArea').addEventListener('click', greetUser);

//  ==> Data Fecthing functions in jQuery
$.get('url', function(data) {
        $('.result').html(data);
        alert('Load was completed successfully')
})

// Callback functions allow you to delay the execution of a function.
// Mainly seen in Node.js

// Disadvantages of Callback functions.

// => CallBack Hell.
fetchCurrentUser(`api/user`, function(result) {
        fetchFollowerByUserId(`api/follower/${result.userId}`, function(result) {
                fetchFollwerInterests(`api/interests/${result.followerId}`, function(result) {
                        fetchInterestTages(`api/tages/${result.interestId}`, function(result) {
                                fetchTagDescriptions(`api/tags/${result.tagId}`, function(result) {
                                        // Finally Display Data ...
                                });
                        });
                });
        });
});


// ==================================================================

// PROMISES IN JAVASCRIPT.

// ==================================================================

// A promise is a proxy value for a value not necessarily known when the promise is created.
// It allows you to associate handlers with an asynchronous action's eventual success value or failure reason.

// A promise is an Object is JavaScript.
// A promise is in one of the three states;
        //  => Pending: Which is the inital state, neither fullfilled nor rejected.
        //  => Fulfilled: Meaning that the operation completed successfully.
        //  => Rejected: Meaning that the operation failed.

// Reasons for Using Promises.
// => Promises help us deal with asynchronous code in a far more simpler way compared to callbacks.
// => Callback hell can be avoided with the use of Promises.

// How to work with Promises in JavaScript.

// => How to create a promise.
const promiseA = new Promise();

// => How to fulfill or reject the promise.
const promiseB = new Promise(function(resolve, reject) {
        resolve(); // Called when the promise is fulfilled.
        reject() // Called when the promise is rejected.
});

const promiseC = new Promise(function(resolve, reject) {
        setTimeout(function() {
                resolve(); 
        }, 5000); // If the promise is fulfilled, call the resolve function after 5 seconds.

        setTimeout(function() {
                reject()
        }, 5000); // If the promise is rejected, call the reject function after 5 seconds.
});

// How to execute callback functions based on the status change.
const onPromiseFulfilled = (result) => {
        console.log(result);
        console.log(`Promise Fulfilled ... `);
}

const onPromiseRejected = (error) => {
        console.log(error);
        console.log(`Promise Rejected ... `);
}

const promiseD  = new Promise(function(resolve, reject) {
        setTimeout(function() {
                resolve(`Do Something once everything is okay and fulfilled ...`);
        }, 5000)
})

const promiseE  = new Promise(function(resolve, reject) {
        setTimeout(function() {
                reject(`Do Something once everything is rejected ...`);
        }, 5000)
})

promiseD.then(onPromiseFulfilled);
promiseE.catch(onPromiseRejected);

// Promise Status => Pending => Fulfilled => then() is executed.
// Promise Status => Pending => Rejected => catch() is executed.

// Thenables
// => Encouraged to separate then() functions from catch() functions.
// => then() and catch() functions both return promises.

// Chaining
// => then() and catch() functions/methods can be chained in javascript.
// Can be done as many times as possible.
promiseE.then(onPromiseFulfilled).catch(onPromiseRejected);

// => CallBack Hell.
fetchCurrentUser(`api/user`, function(result) {
        fetchFollowerByUserId(`api/follower/${result.userId}`, function(result) {
                fetchFollwerInterests(`api/interests/${result.followerId}`, function(result) {
                        fetchInterestTages(`api/tages/${result.interestId}`, function(result) {
                                fetchTagDescriptions(`api/tags/${result.tagId}`, function(result) {
                                        // Finally Display Data ...
                                })
                        })
                })
        })
});

// => Promises
const promises = fetchCurrentUser(`api/user`);
promises
        .then(result => fetchFollowerByUserId(`api/follower/${result.userId}`))
        .then(result => fetchFollowerInterests(`api/interests/${result.followerId}`))
        .then(result => fetchInterestTages(`api/tages/${result.interestId}`))
        .then(result => fetchTagDescriptions(`api/tags/${result.tagId}`))
        .then(result => console.log('Display the data ... ', result))
        .catch(err => console.error(err))


// Promise => static methods

// Promise.all()
        // => Query multiple APIs and perform some actions on all of them but only 
        // after all the APIs have finished loading...
        // Outputs whatever resolves first
        const promise1 = new Promise.resolve(3);
        const promise2 = 42;
        const promise3 = new Promise((resolve, reject) => {
                setTimeout(resolve, 200, 'Food')
        })

        Promise.all([promise1, promise2, promise3]).then(values => console.log(values))

// => Promise.all() method takes an iterable of promises as a input and returns a single promise that resolves to an array of the results of the input promises.
// => The returned promise will resolve when all the input's promises have resolved, or if the input iterable contains no promises.
// => It rejects immediately if any of the input promises are rejected or non-promises throw an error, and will reject with this first rejection message/error.

// Promise.allSettled()
        // => It waits for all the input promises to complete regardless of whether or not 
        // one of them is rejected...
        const promise10 = new Promise.resolve(3);
        const promise20 = 42;
        const promise30 = new Promise((resolve, reject) => {
                setTimeout(resolve, 200, 'Food')
        })

        Promise.allSettled([promise10, promise20, promise30]).then(values => console.log(values))

// Promise.race()
        // => returns a promise that fulfills or rejects as soon as one of the input promises 
        // fulfills or rejects, with the value or reason from that promise...
        const promise100 = new Promise(function(resolve, reject) {
                setTimeout(resolve, 700, 'one')
        });
        const promise200 = new Promise((resolve, reject) => {
                setTimeout(resolve, 200, 'two')
        })
        // Both resolve but promise200 is faster that promise100
        Promise.race([promise100, promise200]).then(values => console.log(values))


// ==================================================================

// ASYNC/AWAIT IN JAVASCRIPT.

// ==================================================================

// async
        // => The 'async' keyword is used to declare async functions.
        // => Async Functions are functions that are instances of the AsyncFunction constructor.
        // => Unlike normal functions, async functions always return a promise.

        // Normal function
        function greetPerson() { return 'Hello' }; greetPerson(); // => 'Hello'

        // Async function
        async function greetPerson() { return 'Hello' }; greetPerson(); // => Promise {<fulfilled>: 'Hello'}
        
        // Async function
        async function greetPerson() { 
                return Promise.resolve('Hello'); 
        }; 
        greetPerson().then((value) => console.log(value)); // => 'Hello'

// await
        // => The 'await' keyword can be put infront of any async promise based functions to 
        // pause your code until that promise settles and returns its result.
        // => The 'await' only works inside 'async' functions. Cannot use 'await' in normal functions.

        async function greet() {
                let promise1000 = new Promise(function(resolve, reject) {
                        setTimeout(() => resolve('Hello Stephen'), 1000)
                });
                let result = await promise1000; // waits until the promise settled.
                console.log(result); // Prints messsage to console once the promise has settled
        }
        greet();

        // => CallBack Hell.
        fetchCurrentUser(`api/user`, function(result) {
                fetchFollowerByUserId(`api/follower/${result.userId}`, function(result) {
                        fetchFollwerInterests(`api/interests/${result.followerId}`, function(result) {
                                fetchInterestTages(`api/tages/${result.interestId}`, function(result) {
                                        fetchTagDescriptions(`api/tags/${result.tagId}`, function(result) {
                                                // Finally Display Data ...
                                        })
                                })
                        })
                })
        });

        // => Promises
        const promises1 = fetchCurrentUser(`api/user`);
        promises
                .then(result => fetchFollowerByUserId(`api/follower/${result.userId}`))
                .then(result => fetchFollowerInterests(`api/interests/${result.followerId}`))
                .then(result => fetchInterestTages(`api/tages/${result.interestId}`))
                .then(result => fetchTagDescriptions(`api/tags/${result.tagId}`))
                .then(result => console.log('Display the data ... ', result))
                .catch(err => console.error(err));

        // => async/await
        async function fetchUserData() {
                const user = await fetchCurrentUser(`api/user`);
                const userId = await fetchFollowerByUserId(`api/follower/${result.userId}`);
                const interests = await fetchFollowerInterests(`api/interests/${result.followerId}`);
                const interestTags = await fetchInterestTages(`api/tages/${result.interestId}`);
                const tagDescription = await fetchTagDescriptions(`api/tags/${result.tagId}`);
                console.log(`Display the data: `, result);
        }

        // => async/await with error handling(error catching)
        async function fetchUserData() {
                try {
                        const user = await fetchCurrentUser(`api/user`);
                        const userId = await fetchFollowerByUserId(`api/follower/${result.userId}`);
                        const interests = await fetchFollowerInterests(`api/interests/${result.followerId}`);
                        const interestTags = await fetchInterestTages(`api/tages/${result.interestId}`);
                        const tagDescription = await fetchTagDescriptions(`api/tags/${result.tagId}`);
                } catch (err) {
                        console.error(`Error: `, err);
                } finally {
                        console.log(`Display the data: `, result);
                }
        }

// Sequential vs Concurrent vs Parallel Execution


// ==================================================================

// EVENTLOOP IN JAVASCRIPT.

// ==================================================================

console.log("One");
console.log("Two");
console.log("Three");

console.log("One");
setTimeout(function() {
        console.log("Two");
}, 2000);
console.log("Three");

console.log("One");
setTimeout(function() {
        console.log("Two");
}, 0);
console.log("Three");

// Async Promise code
console.log("One");

// ===============

async function fetchUserData() {
        let promiseData = await fetch('https://jsonplaceholder.typicode.com/users');
        let usersInfo = await promiseData.json()
        // return usersInfo
        console.log(usersInfo);
        usersInfo.forEach(user => console.log(user));
}
fetchUserData();

// ===============

const userInfo = async () => {
        let fetchData = await fetch('https://jsonplaceholder.typicode.com/users');
        let data = await fetchData.json();
        console.log(data)
        data.forEach(user => {
                console.log(user)
        })
}
userInfo();

// ===============

function userInfoData() {
        let fetchData = fetch('https://jsonplaceholder.typicode.com/users');
        let data = fetchData;
        data
                .then(response => {
                        return response.json()
                })
                .then(data => {
                        data.forEach(user => {
                                console.log(user);
                        })
                })
                .catch(err => console.log(err))

}
userInfoData();

// ===============

console.log("Two");
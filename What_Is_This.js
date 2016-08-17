// utility for logging
if(!log)
    var log = function(){ console.log([].slice.call(arguments)) }

var FILL_ME_IN

// predefined variables
var whatIsThis = function(a, b) {
    return [this, a, b].join(',')
}

var inAnObject = {
    name: 'inAnObject',
    test1: whatIsThis,
    anotherObject: {
        name: 'anotherObject',
        test2: whatIsThis
    }
}

var inAFunction = function(a, b) {
    this.name = 'Sally'
    whatIsThis(a, b)
}

inAFunction.prototype.test3 = whatIsThis

var trickyTricky = {
    name: 'trickyTricky',
    why: 'does this work?',
    what: 'is going on here?'
}

var confusing = {
    name: 'confusing',
    state: 'Alaska',
    city: 'Anchorage'
}

/**
 * THE PROBLEMS
 */

console.assert(whatIsThis('hello', 'world') === "[object Window],hello,world")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
//answer: Global var addressing the Window, a,b are returned and joined at the ","

console.assert(window.whatIsThis('hello', 'world') === "[object Window],hello,world")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
//answer: Same answer as the first question

console.assert(inAnObject.test1('face', 'book') === "[object Object],face,book")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
// answer: the value of key test1 is whatIsThis (a,b)

console.assert(inAnObject.anotherObject.test1('twitter', 'book') === FILL_ME_IN)
// Once you've figured out what the output is, answer here in a comment: Why is this so?
// answer: This does not work due to test1 not being in anotherObject

console.assert(inAnObject.anotherObject.test2('twitter', 'book') === "[object Object],twitter,book")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
// answer: whatIsThis is the value of key test2

console.assert(whatIsThis.call() === "[object Object],,")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
// answer: whatIsThis is the function we want to execute, but there is no object and arguments

console.assert(whatIsThis.call(trickyTricky) === "[object Object],,")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
// answer: whatIsThis is the function and trickyTricky is the obj we are calling on but no argumnets

console.assert(whatIsThis.call(trickyTricky, 'nice', 'job') === "[object Object],nice,job")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
// answer: trickyTricky is the object and nice/job are the arguments

console.assert(whatIsThis.call(confusing) === "[object Object],,")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
// answer: Same reason as line 64

console.assert(whatIsThis.call(confusing, 'hello') === "[object Object],hello")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
// answer: trickyTricky is the object and hello is the argument in whatIsthis

console.assert(whatIsThis.apply(trickyTricky) === "[object Object],,")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
// answer: No object and array are called

console.assert(whatIsThis.apply(confusing, ['nice', 'job']) === "[object Object],nice,job")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
// answer: apply() is using the object, array ['nice','job'] and using the whatIsThis function

console.assert(whatIsThis.apply(confusing, 'nice', 'job') === FILL_ME_IN)
// Once you've figured out what the output is, answer here in a comment: Why is this so?
// answers: apply() deals with arrays and there isn't an array here

console.assert(inAFunction('what will', 'happen?') === "[object Object],what will,happpen?")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
// answer: inAFunction = function(a, b)

try{
    console.assert(inAFunction.test3('A', 'B') === FILL_ME_IN)
} catch(e){
    log(e)
}
// Once you've figured out what the output/result is, answer here in a comment: Why is this so?
// answer: error because the constructor can not use the method it created on itself

var newObject = new inAFunction('what will', 'happen?')
console.assert(newObject.name === "Sally")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
// answer: newObject is the new inAFunction so newObject.name refers to Sally

var newObject2 = new inAFunction('what will', 'happen?')
console.assert(newObject2.test3('C', 'D') === "[object Object],C,D")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
// answer: newObject is the new inAFunction, test3 whatIsThis (a,b)

console.assert(inAnObject.test1.call(trickyTricky, 'face', 'book') === "[object Object],face,book")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
// answer: the value of test1 is whatIsThis (a,b)

console.assert(inAnObject.anotherObject.test2.apply(confusing, ['foo', 'bar']) === "[object Object],foo,bar")
// Once you've figured out what the output is, answer here in a comment: Why is this so?
// answer: the arguments are in an array so apply() works.

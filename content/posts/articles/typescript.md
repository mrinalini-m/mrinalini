---
title: 'Typescript Notes'
date: 2020-08-07
slug: 'typescript-notes'
tags:
  - typescript
category: articles
---

## Union Types

A type isn't limited to a single type. A parameter or variable can have more than one type.

```typescript
type NumberOrString = number | string

let numOrStr: NumberOrString = 'string'
```

## Types by Inference And Literal Types

You don't have to declare all types. Typescript can infer and generate types for you in many cases.

```typescript
let str = 'string' //Inferred type --> let str: string
let num = 1 // Inferred type --> let num: number
```

Letting typescript infer types works best with primitive types like string, number, boolean etc. It doesn't work so well when you want a mixed array or object with properties other than the ones you declared during instantiation.

```typescript
let obj = { a: 1 } // Inferred type --> let obj: { a: number; }
obj.b = 2 //Typescript Error

let mixedArr = [1, 'ar', obj] // Inferred type --> let mixedArr: (string | number | { a: number; })[]
mixedArr.push({ b: 2 }) //Typescript error
```

If you declare a variable as a `const`, typescript will infer the literal type. A literal is a more concrete sub-type of a collective type. What this means is that "Hello World" is a string, but a string is not "Hello World" inside the type system.

```typescript
const str = 'something' //Inferred type --> const str: "something"
const bool = true // Inferred type --> const bool: true
```

Literal types are useful when you want to want to limit the types even more.

```typescript
type ButtonColor = 'green' | 'red' | 'blue'
const myButton = 'black' // Typescript error
```

## Declaring Function Types

For a function declaration, you can declare the type in the following way:

```typescript
function add(x: number, y: number): number {
	return x + y
}
```

For a function expression type declaration:

```typescript
const myAdd: (x: number, y: number) => number = function (
	x: number,
	y: number
): number {
	return x + y
}
```

For a function expression, typescript can infer the type of parameters and return even if you omit one side. This is called `contextual typing`, a form of type inference. So,

```js
const myAdd: (x: number, y: number) => number = function (x, y) {
	return x + y
}
```

and

```typescript
const myAdd = function (x: number, y: number): number {
	return x + y
}
```

are both valid.

Similar to [interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html), function parameter types can have optional types declared with a `?`. Optional types must follow required types.

```typescript
function buildName(first: string, last: string, middle?: string): string {
	let fullName = `${first} `
	if (middle) fullName += `${middle} `
	fullName += last
	return fullName
}
```

Functions can also have default-initialized parameters. Default-initialized parameters that come after all required parameters are treated as optional, and just like optional parameters, can be omitted when calling their respective function. This means optional parameters and trailing default parameters will share commonality in their types, so both

```typescript
function buildName(firstName: string, lastName?: string) {
	// ...
}
```

and

```typescript
function buildName(firstName: string, lastName = 'Smith') {
	// ...
}
```

share the same type `(firstName: string, lastName?: string)`. You can call the functions like this: `buildName('Sam')`.

Unlike plain optional parameters, default-initialized parameters don’t need to occur after required parameters. If a default-initialized parameter comes before a required parameter, users need to explicitly pass undefined to get the default initialized value.

```typescript
function buildName(first: string, middle = '', last: string): string {
	let fullName = `${first} `
	if (middle) fullName += `${middle} `
	fullName += last
	return fullName
}
console.log(buildName('Sam', undefined, 'M')) // logs "Sam M"
console.log(buildName('Sam', 'M')) // Typescript Error
```

Function types can also be declared as interfaces for function expressions. However, since optional parameters cannot come before required parameters, the above function types written as an interface would be:

```typescript
interface BuildNameFunc {
	(first: string, middle: string | undefined, last: string): string
}

// Works for arrow function expressions too.
// const buildName: BuildNameFunc = (first, middle = '', last) => {
const buildName: BuildNameFunc = function (first, middle = '', last) {
	let fullName = `${first} `
	if (middle) fullName += `${middle} `
	fullName += last
	return fullName
}
```

Changing the order of the parameters,

```typescript
interface BuildNameFunc {
	(first: string, last: string, middle?: string): string
}

const buildName: BuildNameFunc = (first, last, middle = '') => {
	let fullName = `${first} `
	if (middle) fullName += `${middle} `
	fullName += last
	return fullName
}
```

## Typescript Gotchas

### Excess Property Checks

Object literals get special treatment and undergo excess property checking when assigning them to other variables, or passing them as arguments. If an object literal has any properties that the “target type” doesn’t have, you’ll get an error:

```typescript
interface LabeledObj {
	id: number
	label?: string
	text?: string
}

function printLabel(labeledObj: LabeledObj) {
	for (const key in labeledObj) {
		console.log(key, labeledObj[key])
	}
}

/* 
Typescript error:
Argument of type '{ id: number; size: number; label: string; }' is not assignable to parameter of type 'LabeledObj'.
  Object literal may only specify known properties, and 'txt' does not exist in type 'LabeledObj'.ts(2345)
 */
printLabel({ id: 0, txt: 'Label Text', label: 'Size 10 Object' })
```

There are three ways to get around this:

### 1. Type assertion

The easiest way to get around this is to use a [type assertion.](https://www.typescriptlang.org/docs/handbook/basic-types.html#type-assertions)

```typescript
printLabel({ id: 0, txt: 'Label Text', label: 'Size 10 Object' } as LabeledObj)
```

### 2. Declaring types for objects with unknown properties

Adding `[propName: string]: any` to the object type declaration will also fix the error.

```typescript
interface LabelWithUnknownProperties {
	id: number
	label?: string
	text?: string
	[propName: string]: any
}

function printObj(obj: LabelWithUnknownProperties) {
	for (const key in obj) {
		console.log(key, obj[key])
	}
}

printObj({
	id: 0,
	tags: ['produce', 'perishable'],
})
```

### 3. Passing an object reference instead of an object literal.

```typescript
let labelObj = { id: 0, txt: 'Label Text', label: 'Size 10 Object' }
// No Typescript error
printLabel(labelObj)
```

> Note: If you declare a type for the labelObj however, typescript WILL throw an error.

```typescript
/* 
Typescript error:
Type '{ id: number; txt: string; label: string; }' is not assignable to type 'LabeledObj'.
  Object literal may only specify known properties, but 'txt' does not exist in type 'LabeledObj'. Did you mean to write 'text'?
*/
let labelObj: LabeledObj = { id: 0, txt: 'Label Text', label: 'Size 10 Object' }
printLabel(labelObj)
```

> Note: For more complex object literals that have methods and hold state, you might need to keep these techniques in mind, but a majority of excess property errors are actually bugs so don't try to get around it! You either need to revise the type declaration or find the bug.

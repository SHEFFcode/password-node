var person = {
  name: 'Jeremy',
  age: 27
}

var personJSON = JSON.stringify(person);

var personObject = JSON.parse(personJSON);
console.log(personJSON);
console.log(person);
console.log(personObject.name);
console.log(typeof personObject);

console.log('CHALLANGE ARE');

var animal = '{"name": "Hallie"}';

var animalObject = JSON.parse(animal);
animalObject.age = 2;
animal = JSON.stringify(animalObject);
console.log(animal);
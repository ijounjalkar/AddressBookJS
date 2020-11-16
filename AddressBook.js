//Usecase1:
var prompt = require('prompt-sync')();
let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
let addressRegex = RegExp('[A-z]{4,}$');
let zipRegex = RegExp('[0-9]{3}[0-9]{3}');
let phoneRegex = RegExp('[0-9]{2}[789]{1}[0-9]{2,10}');
let emailRegex = RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[$#@!%_&])[A-Za-z0-9$#@!%_&]{8,}$');
class Contact{
    constructor(...params){
        this.firstName = params[0];
        this.lastName = params[1];
        this.address = params[2];
        this.city = params[3];
        this.state = params[4];
        this.zip = params[5];
        this.phone = params[6];
        this.email = params[7];
    } 
    get firstName(){return this._firstName}
    set firstName(firstName){
        if(nameRegex.test(firstName)){
            this._firstName = firstName;
        }else{
            throw "Invalid First Name";
        }
    }
    get lastName(){return this._lastName}
    set lastName(name){
        if(nameRegex.test(name)){
            this._lastName = name;
        }else{
            throw "Invalid Last Name";
        }
    }
    get address(){return this._address}
    set address(add){
        if(addressRegex.test(add)){
            this._address = add;
        }else{
            throw "Invalid address";
        }
    }
    get city(){return this._city}
    set city(cityName){
        if(addressRegex.test(cityName)){
            this._city = cityName;
        }else{
            throw "Invalid city";
        }
    }
    get state(){return this._state};
    set state(stateName){
        if(addressRegex.test(stateName)){
            this._state = stateName;
        }else{
            throw "Invalid state";
        }
    }
    get zip(){return this._zip}
    set zip(zipCode){
        if(zipRegex.test(zipCode)){
            this._zip = zipCode;
        }else{
            throw "Invalid zip";
        }
    }
    get phone(){return this._phone}
    set phone(number){
        if(phoneRegex.test(number)){
            this._phone = number;
        }else{
            throw "Invalid phone number";
        }
    } 
    get email(){return this._email}
    set email(email){
        if(emailRegex.test(email)){
            this._email = email;
        }else{
            throw "Invalid Email";
        }
    }  
    toString(){
        return "FirstName: "+this.firstName+" LastName: "+this.lastName + " Address: "+this.address + " City: "+this.city + " State: "+this.state 
                + " Zip: "+this.zip + " Phone: "+this.phone + " Email: "+this.email;
    }
}
function createContact(){
    let fName = prompt("Enter first name: ");
    let lName = prompt("Enter last name: ");
    let address = prompt("Enter the address: ");
    let city = prompt("Enter the city: ");
    let state = prompt("Enter the state: ");
    let zip = prompt("Enter the zip: ");
    let phone = prompt("Enter the phone: ");
    let email = prompt("Enter the email: ");
    let contact = new Contact(fName,lName,address,city,state,zip,phone,email);
    return contact;
}
//Usecase3:
let addressBookArr = new Array();
function addContact(){
    let newContact = createContact();
    if(checkDuplicate(newContact)){
        console.log("Contact already exist");
    }else{
        addressBookArr.push(newContact);
    }
}
addContact();
console.log(addressBookArr);

//Usecase4:
function editContact(personName){
    addressBookArr.forEach(contact => {
        if((contact._firstName+" " + contact._lastName) == (personName)){
            let choice = prompt("1.Add new phone 2.Add new email 3.Exit ");
            switch(parseInt(choice)){
                case 1 :
                    var phoneNumber = prompt("Enter the phone no: ");
                    contact._phone = phoneNumber;
                    break;
                case 2 :
                    var emailId = prompt("Enter the email: ");
                    contact._email = emailId;
                    break; 
                case 3 :
                    return;
            }

        }
    });
}
let editName = prompt("Enter the person name");
editContact(editName);
console.log(addressBookArr); 

//Usecase5:
function deleteContact(personName){
    let i = 0;
    addressBookArr.forEach(contact => {
        if((contact._firstName+" " + contact._lastName) == (personName)){
            addressBookArr.splice(i,1);
        }
        i++;
    });
}

let deleteName = prompt("Enter the person name to delete");
deleteContact(deleteName);
console.log(addressBookArr);

//Usecase6:
function countContacts(){
    return addressBookArr.length;
}
console.log(countContacts());

//Usecase7:
function checkDuplicate(newContact){
    addressBookArr.forEach(contact => {
        if((contact.firstName + " " + contact.lastName) == (newContact.firstName + " " + newContact.lastName)){
            console.log("Exists")
            return true;
        }
    });
}

//Usecase8:
function searchPersonByCity(name,city){
    return addressBookArr.filter(contact => contact.city == city).filter(contact=> (contact.firstName + " " + contact.lastName) == name);
}
let personByCity = searchPersonByCity(prompt("Enter name"),prompt("Enter city"));
console.log("Person in"+ city + " is: " +personByCity);

function searchPersonByState(name,state){
    return addressBookArr.filter(contact => contact.state == state).filter(contact=> (contact.firstName + " " + contact.lastName) == name);
}
let personByState = searchPersonByState(prompt("Enter name"),prompt("Enter state"));
console.log("Person in "+ state + " is: "+personByState);

//Usecase9:
function viewPersonsByCity(city){
    let list = addressBookArr.filter(contact => contact.city == city);
    return list;
}
let viewByCity = viewPersonsByCity(prompt("Enter city name"));
console.log("Persons in " + city + "are: " + viewByCity);

function viewPersonsByState(state){
    let list = addressBookArr.filter(contact => contact.state == state);
    return list;
}
let viewByState = viewPersonsByState(prompt("Enter state name"));
console.log("Persons in " + state + "are: " + viewByState);

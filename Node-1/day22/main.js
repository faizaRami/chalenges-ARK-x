const readline = require('readline');
// create the readline interface
const rl = readline.createInterface({
    input: process.stdin, // input stream from keyboard
    output: process.stdout, 
})
// declare contact array
const contacts = [];
// Add Contact function
const addContact=()=>{
    rl.question("Enter your name : ", (name)=>{
        rl.question(`Enter ${name}'s phone number : `,(number) => {
            contacts.push({name , number});   
            console.log(`added to list \n`);
            showMenu()
            })
            });   }

// show all contact added in app
const allContacts=()=>{
    if (contacts.length === 0) {
        console.log("No contact is exist");
    }else{
        contacts.map((contact, index )=>
        console.log(`${index+1}. Name:${contact.name} Number:${contact.number} \n`));
    }
    showMenu()
}

//search one contact by name
  const searchContact=(searchName)=>{
    const foundContact = contacts.find((contact) => contact.name === searchName);
    if(foundContact){
        console.log(`Contact found: Name: ${foundContact.name}, Number: ${foundContact.number}\n`);

  }else {
    console.log(`Contact with name "${searchName}" not found.\n`);
  }
  showMenu()
}
//exit from app
const exitTheApp=()=> {
    console.log('Exiting the application.');
    rl.close();
  }
  //to display our functions
  function showMenu() {
    console.log(`Choose an option:\n 
    1. Add a contact\n
    2. View all contacts\n
    3. Search for a contact\n
    4. Exit The App`)
    rl.question('Enter your choice: ', (choice) => {
      if (choice == '1') {
       
          addContact();
           }else if(choice == '2'){
            allContacts();
        }else if(choice == '3'){
            rl.question('Enter the name to search: ', (searchName) => {
                 searchContact(searchName);})

        }else if(choice === '4'){
            exitTheApp();
        }else{
            console.log('Invalid choice. Please try again.\n');
        showMenu();
        }
        })
    }

    console.log('Welcome to Contact Application!\n');
showMenu();
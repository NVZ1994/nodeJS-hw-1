const contacts = require("./contacts");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      return allContacts;

    case "get":
      const contact = await contacts.getContactById(id);
      console.table(contact);
      return contact;

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.table(newContact);
      return newContact;

    case "remove":
      const removeContact = await contacts.removeContact(id);
      console.table(removeContact);
      return removeContact;

    default:
      console.warn("\x1B[31m Unknown action type!");
      return;
  }
}

const action = argv.action;

invokeAction({
  action,
  id: argv.id,
  name: argv.name,
  email: argv.email,
  phone: argv.phone,
});

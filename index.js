const { program } = require('commander');

const contacts = require('./contacts.js');

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      return console.table(allContacts);
    case 'get':
      const currentContact = await contacts.getContactById(id);
      return console.log('invokeAction >> currentContact:', currentContact);
    case 'add':
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log('invokeAction >> newContact:', newContact);
    case 'remove':
      const deletingContact = await contacts.removeContact(id);
      return console.log('invokeAction >> deletingContact:', deletingContact);
    default:
      return console.warn('\x1B[31m Unknown action type!');
  }
};

program
  .option('-a, --action, <type>')
  .option('-i, --id, <type>')
  .option('-n, --name, <type>')
  .option('-e, --email, <type>')
  .option('-p, --phone, <type>');
program.parse();

const options = program.opts();
invokeAction(options);

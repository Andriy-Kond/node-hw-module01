const { program } = require('commander');

const contacts = require('./contacts.js');

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      return console.log('invokeAction >> allContacts:', allContacts);
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
      return console.log('Unknown action');
    // return console.warn('\x1B[31m Unknown action type!');
  }
};

// invokeAction({ action: 'list' });
// invokeAction({ action: 'get', id: 'AeHIrLTr6JkxGE6SN-0Rw' });
// invokeAction({
//   action: 'add',
//   name: 'Andriy',
//   email: 'andriy.kondr@mail.com',
//   phone: '+380 55 555 55 55',
// });

// & У PUT-запиті тре передавати УСІ поля, бо він перезаписує запис повністю.
// invokeAction({
//   action: 'change',
//   id: '8QLyVwAhWDbZF-Ah7KnQ_',
//   name: 'Andriy Kond',
//   email: 'andriy.kondr@mail.com',
//   phone: '+380 55 555 66 66',
// });

// invokeAction({ action: 'remove', id: '8QLyVwAhWDbZF-Ah7KnQ_' });

program
  .option('-a, --action, <type>')
  .option('-i, --id, <type>')
  .option('-n, --name, <type>')
  .option('-e, --email, <type>')
  .option('-p, --phone, <type>');
program.parse();

const options = program.opts();
invokeAction(options);

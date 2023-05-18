const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db/contacts.json');
console.log('contactsPath:', contactsPath);

async function listContacts() {
  const buffer = await fs.readFile(contactsPath);
  return JSON.parse(buffer);
}

async function getContactById(id) {
  const allContacts = await listContacts();
  const currentContact = allContacts.find(contact => id === contact.id);
  return currentContact || null;
}

async function addContact(contact) {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...contact,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
}

async function removeContact(id) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(contact => contact.id === id);
  if (index === -1) return null;

  const [deletedContact] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return deletedContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};

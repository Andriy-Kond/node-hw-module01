const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db/contacts.json');
console.log('contactsPath:', contactsPath);

async function listContacts() {
  try {
    const buffer = await fs.readFile(contactsPath);
    return JSON.parse(buffer);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(id) {
  try {
    const allContacts = await listContacts();
    const currentContact = allContacts.find(contact => id === contact.id);
    return currentContact || null;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(contact) {
  try {
    const allContacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...contact,
    };
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(id) {
  try {
    const allContacts = await listContacts();
    const index = allContacts.findIndex(contact => contact.id === id);
    if (index === -1) return null;

    const [deletedContact] = allContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return deletedContact;
  } catch (error) {
    console.log(error.message);
  }
}

async function changeContact(id, data) {
  try {
    const allContacts = await listContacts();
    const index = allContacts.findIndex(contact => contact.id === id);
    if (index === -1) return null;

    allContacts[index] = { id, ...data };
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return allContacts[index];
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  changeContact,
};

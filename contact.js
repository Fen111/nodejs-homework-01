const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");
const ct = require("./contacts.json");

const pathContacts = path.join(__dirname, "contacts.json");

const readContent = async () => {
  const content = await fs.readFile(pathContacts, "utf-8");
  return JSON.parse(content);
};

async function listContacts() {
  return await readContent();
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((c) => c.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((c) => c.id === contactId);
  if (idx === -1) {
    return null;
  }
  const newContacts = contacts.filter((_, index) => index !== idx);
  await fs.writeFile(pathContacts, JSON.stringify(newContacts));
  return newContacts;
};

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

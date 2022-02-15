const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");
const ct = require("./contacts.json");

const readContent = async () => {
  const content = await fs.readFile(
    path.join(__dirname, "contacts.json"),
    "utf-8"
  );
  return JSON.parse(content);
};

async function listContacts() {
  return await readContent();
}

async function getContactById(contactId) {
  const contacts = await readContent();
  const contact = contacts.find((c) => c.id === contactId);
  return contact;
}

function removeContact(contactId) {
  const contacts = await readContent();
}

async function addContact(name, email, phone) {
  const contacts = await readContent();
  const newContact = { id: randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(contacts, null, 2)
  );
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

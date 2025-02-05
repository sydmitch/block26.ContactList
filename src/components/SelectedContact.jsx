import React from 'react'
import { useEffect, useState } from 'react'


export default function SelectedContact({ selectedContactId, setSelectedContactId }) {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    async function fetchContact() {
      try {
        const response = await fetch(
          `https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users/${selectedContactId}`
        );
        const result = await response.json();
        setContact(result); // Set the fetched contact data
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    }

    if (selectedContactId) {
      fetchContact();
    }
  }, [selectedContactId]);
  console.log("Selected Contact:", contact);

  return (
    <div>
      <h2>Contact Details</h2>
      {contact ? (
        <div>
          <p><strong>Name:</strong> {contact.name}</p>
          <p><strong>Email:</strong> {contact.email}</p>
          <p><strong>Phone:</strong> {contact.phone}</p>
          <p><strong>Website:</strong> {contact.website}</p>
          <p><strong>Company:</strong> {contact.company?.name}</p>
          <button onClick={() => setSelectedContactId(null)}>Back to Contact List</button>
        </div>
      ) : (
        <p>Loading contact details...</p>
      )}
    </div>
  );
}
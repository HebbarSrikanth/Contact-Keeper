import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import ContactContext from '../../context/contacts/contactContext'

const ContactItem = ({ contact }) => {

    //De-structure the prop contact that we receive from the list of contacts
    const { id, name, type, phone, email } = contact

    //Use the contact context for deleting, set & delete the current user
    const contactContext = useContext(ContactContext)
    const { deleteContact, setCurrentUser, delCurrentUser } = contactContext;

    //Delete the particular contact on delete
    const contactDelete = () => {
        deleteContact(id)
        delCurrentUser()
    }

    return (
        <div className="card bg-light">
            <h3>
                {name}
                <span className={"badge " + (type === 'professional' ? 'bg-dark' : 'bg-success')}
                    style={{ float: 'right' }}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className="list">
                {email && <li>Email : {email}</li>}
                {phone && <li>Phone : {phone}</li>}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm" onClick={() => setCurrentUser(contact)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={contactDelete}>Delete</button>
            </p>
        </div>
    )
}

//Define the requirement of props, if this props is not coming from the parent element 
//warning is shown
ContactItem.propType = {
    contact: PropTypes.object.isRequired
}

export default ContactItem
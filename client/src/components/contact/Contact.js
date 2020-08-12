import React, { useContext, Fragment } from 'react'
import ContactContext from '../../context/contacts/contactContext'
import ContactItem from './ContactItem'

const Contact = () => {

    //Use the contact from the ContactContext State
    const contactContext = useContext(ContactContext)

    //Destructure it for clean lookup
    const { contacts } = contactContext

    return (
        <Fragment>
            {contacts.map((eachContact) => (
                <ContactItem key={eachContact.id} contact={eachContact} />
            ))}
        </Fragment>
    )
}

export default Contact

import React, { useContext, Fragment } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ContactContext from '../../context/contacts/contactContext'
import ContactItem from './ContactItem'

const Contact = () => {

    //Use the contact from the ContactContext State
    const contactContext = useContext(ContactContext)

    //Destructure it for clean lookup
    const { contacts, filter } = contactContext

    if (contacts.length <= 0)
        return <h4>Please add contact!!</h4>

    return (
        <Fragment>
            <TransitionGroup>
                {filter !== null ?
                    filter.map(contact =>
                        <CSSTransition key={contact.id} timeout={500} classNames='item'>
                            <ContactItem contact={contact} />
                        </CSSTransition>
                    ) :
                    contacts.map((eachContact) => (
                        <CSSTransition key={eachContact.id} timeout={500} classNames='item'>
                            <ContactItem contact={eachContact} />
                        </CSSTransition>
                    ))
                }
            </TransitionGroup>
        </Fragment>
    )
}

export default Contact

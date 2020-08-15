import React, { useContext, Fragment, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ContactContext from '../../context/contacts/contactContext'
import ContactItem from './ContactItem'
import Spinner from '../../Layouts/Spinner'

const Contact = () => {

    //Use the contact from the ContactContext State
    const contactContext = useContext(ContactContext)

    useEffect(() => {
        fetchContacts();
        //eslint-disable-next-line
    }, [])

    //Destructure it for clean lookup
    const { contacts, filter, fetchContacts, loading } = contactContext

    if (contacts !== null && contacts.length <= 0)
        return <h4>Please add contact!!</h4>

    return (
        <Fragment>
            {contacts != null && !loading ? (<TransitionGroup>
                {filter !== null ?
                    filter.map(contact =>
                        <CSSTransition key={contact._id} timeout={500} classNames='item'>
                            <ContactItem contact={contact} />
                        </CSSTransition>
                    ) :
                    contacts.map((eachContact) => (
                        <CSSTransition key={eachContact._id} timeout={500} classNames='item'>
                            <ContactItem contact={eachContact} />
                        </CSSTransition>
                    ))
                }
            </TransitionGroup>) : <Spinner />}

        </Fragment>
    )
}

export default Contact

import React, { useContext, useRef, useEffect } from 'react'
import ContactContext from '../../context/contacts/contactContext'

const ContactFilter = () => {
    const contactContext = useContext(ContactContext)
    const { filterContact, clearFilter, filter } = contactContext

    const text = useRef('')

    useEffect(() => {
        if (filter === null) {
            text.current.value = ''
        }
    })

    const handleFilterChange = e => {
        if (text.current.value !== '') {
            filterContact(e.target.value)
        } else {
            clearFilter()
        }
    }

    return (
        <form>
            <input ref={text} type='text' placeholder='Search Contacts...' onChange={handleFilterChange} />
        </form>
    )
}

export default ContactFilter

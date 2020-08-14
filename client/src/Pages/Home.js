import React from 'react'
import Contact from '../components/contact/Contact'
import ContactForm from '../components/contact/ContactForm'
import ContactFilter from '../components/contact/ContactFilter'

const Home = () => {
    return (
        <div className='grid-2'>
            <div>
                <ContactForm />
            </div>
            <div className='card'>
                <ContactFilter />
                <Contact />
            </div>
        </div>
    )
}

export default Home

import React from 'react'
import Contact from '../components/contact/Contact'
import ContactForm from '../components/contact/ContactForm'

const Home = () => {
    return (
        <div className='grid-2'>
            <div>
                <ContactForm />
            </div>
            <div>
                <Contact />
            </div>
        </div>
    )
}

export default Home

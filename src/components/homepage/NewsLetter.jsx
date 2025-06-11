import React from 'react';
import { toast } from 'react-toastify';

const NewLetter = () => {
    const handleNewsletter = e => {
        e.preventDefault();
        const email = e.target.email.value;
        if(email) {
            toast.success('Thank you for subscribing to our newsletter');
        }
    }
    return (
        <div className="my-10 md:my-12 lg:my-18 max-w-sm mx-auto bg-gradient-to-r to-gray-100 from-red-100 p-8 border border-gray-200">
            <h2 className='text-center my-2 text-2xl font-bold'>
                Newsletter
            </h2>
            <form className='space-y-1' onSubmit={handleNewsletter}>
            <input className='input w-full' type="email" name='email'/>
            <button type='submit' className='btn btn-primary w-full'>Subscribe</button>
            </form>
                
        </div>
    );
};

export default NewLetter;
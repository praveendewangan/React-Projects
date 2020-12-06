import React , { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Classes from './ContactData.module.css';
class ContactData extends Component {
    state = {
        name : '',
        email : '',
        address : {
            street : '',
            postalCode: ''
        }
    }

    render() {
        return (
            <div className={Classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input type='text' name='name' placeholder='Your Name' />
                    <input type='text' name='email' placeholder='Your Email' />
                    <input type='text' name='street' placeholder='Street' />
                    <input type='text' name='postal' placeholder='Postal Code' />
                </form>
                <Button btnType="Succes">ORDER</Button>
            </div>
        )
    }
}

export default ContactData;
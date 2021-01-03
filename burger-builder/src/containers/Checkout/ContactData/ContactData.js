import React , { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input';
import order from '../../../components/Order/Order';
import { connect } from 'react-redux';
class ContactData extends Component {
    state = {
        orderForm : {
            name : {
                elementType : 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value:'',
                validations: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType : 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value:'',
                validations: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode : {
                elementType : 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zipcode'
                },
                value:'',
                validations: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country : {
                elementType : 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value:'',
                validations: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email : {
                elementType : 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value:'',
                validations: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod : {
                elementType : 'select',
                elementConfig: {
                    options: [
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'},
                    ]
                },
                validations: {},
                value:'',
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }
    orderHandler = (event) => {
            event.preventDefault();
            console.log(this.props.ings);
            
        this.setState({loading:true});
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients : this.props.ings,
            price : this.props.price,
            orderData : formData
            
        }
        axios.post('/orders.json',order)
        .then(response => {
            this.setState({loading:false});
            console.log(response)
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading:false});
            console.log(error)
        });
    }

    checkValidity (value,rules) {
        let isValid = true;
        if(!rules) {
            return true;
        }
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }
    inputChangeHandler = (event,inputIdentifier) => {
            // console.log(event.target.value);
            const updatedOrderForm = {
                ...this.state.orderForm
            };
            const updatedFormElement = {
                ...updatedOrderForm[inputIdentifier]
            };
            updatedFormElement.value = event.target.value;
            updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validations);
            updatedFormElement.touched = true;
            updatedOrderForm[inputIdentifier] = updatedFormElement;
            let formIsValid = true;
            for(let inputmodifier in updatedOrderForm) {
                formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
            }
            this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid});
    }
    render() {
        const formElementArray = [];
        for(let key in this.state.orderForm) {
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {/* <Input type='text' inputtype='input' name='name' placeholder='Your Name' /> */}
                {formElementArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value} 
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validations}
                        touched={formElement.config.touched}
                        changed={ (event) => this.inputChangeHandler(event,formElement.id)}/>
                ))}
                <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={Classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return  {
        ings: state.ingredients,
        price: state.totalPrice
    }
}
export default connect(mapStateToProps)(ContactData);
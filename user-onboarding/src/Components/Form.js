import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field, setNestedObjectValues} from 'formik';
import * as Yup from "yup"; // for validation
import axios from 'axios';
import { string } from 'postcss-selector-parser';
import { booleanLiteral } from '@babel/types';

// how the form will be rendered
function UserForm ({values, errors, touched, status}) {
    // to update the users
    const [users, setUsers] = useState([]);

    // temp
    console.log('users', users)

    useEffect(() => {
        if (status){
            setUsers([...users, status])
        }
    }, [status])

    console.log('i am the status: ', status);




    return(
        <Form className='user-form'> 

            <h2> Welcome! </h2>
            <Field className='user-field' type='text' name='username' placeholder='username'/>
            <div className='form-error-message'> 
            {touched.username && errors.username && <p>{errors.username}</p>} 
            </div> 

            <Field className='user-field' type='email' name='email' placeholder='email'/>
            <div className='form-error-message'> 
            {touched.email && errors.email && <p>{errors.email}</p>} 
            </div> 

            <Field  className='user-field' type='password' name='password' placeholder='password'/>                 <div className='form-error-message'> 
            {touched.password && errors.password && <p>{errors.password}</p>} 
            </div> 

            <label className='terms-of-service'>
            <Field type='checkbox' name='checkbox' />
            <div className='form-error-message'> 
            {touched.checkbox && errors.checkbox && <p>{errors.checkbox}</p>} 
            </div> 
            <p> Terms of Service </p>
          
            
            </label>
        
            <button className='user-button' type='submit'> Submit </button>

            {/* temp */}
            <div> 
                {users.map(user => (
                <p>
                {user.data.username},{user.data.email} </p>
                ))}

            </div>
        </Form>
    )
}

// to wrap our UserForm inside formik component
const FormikUserForm = withFormik({

    // to connect to the handlers of the data
    mapPropsToValues({ username, email, password, checkbox }) {
      return {
        username: username || "",
        email: email || "",
        password: password || "",
        checkbox: checkbox || false
      };
    },

    // to validate the input
    validationSchema: Yup.object().shape({
        username: Yup.string().required('Username is required'),
        email: Yup.string().email().required('Email is required'),
        password: Yup.string()
        .min(6, "Password must be 6 characters or longer")
        .required("Password is required")
        ,
        checkbox: Yup.boolean().required().oneOf([true], 'Must Accept Terms and Conditions')
    }),



    // to handle the submit event
    handleSubmit (values, {setStatus}) {
        // temp
        console.log('submitting the following values: ', values);
        // to make a post request
        axios
            .post('https://reqres.in/api/users', values)

            // if successful, set the status to the response
            .then(response => {
                // temp
                console.log('i am response', response)

                setStatus(response);
                
                // temp
                console.log('posted');
            })
            // if not successful, log an error

            .catch(error => {
                // temp
                console.log('unable to post', error);
            })
        
    }
    
  })(UserForm );


  
  export default FormikUserForm;


// STEP 2 - Implement Form Validation and Error Messaging

// Using Yup, set up at least two different validations for each field along with custom error codes that will display on screen when validation fails.
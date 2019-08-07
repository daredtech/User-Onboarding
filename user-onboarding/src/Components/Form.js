import React from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from "yup"; // for validation
import { string } from 'postcss-selector-parser';
import { booleanLiteral } from '@babel/types';

// how the form will be rendered
function UserForm ({values, errors, touched}) {
    return(
        <Form className='user-form'> 
            <Field type='text' name='username' placeholder='username'/>
            <div className='form-error-message'> 
            {touched.username && errors.username && <p>{errors.username}</p>} 
            </div> 

            <Field type='email' name='email' placeholder='email'/>
            <div className='form-error-message'> 
            {touched.email && errors.email && <p>{errors.email}</p>} 
            </div> 

            <Field type='password' name='password' placeholder='password'/>                 <div className='form-error-message'> 
            {touched.password && errors.password && <p>{errors.password}</p>} 
            </div> 

            <label className='terms-of-service'>
            <Field type='checkbox' name='checkbox' />
            Terms of Service
            <div className='form-error-message'> 
            {touched.checkbox && errors.checkbox && <p>{errors.checkbox}</p>} 
            </div> 
            
            </label>
        
            <button type='submit'> Submit </button>
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
        email: Yup.string().email(),
        // password: Yup.string().required('Password is required')
        password: Yup.string()
        .min(6, "Password must be 6 characters or longer")
        .required("Password is required")
        ,
        checkbox: Yup.boolean().required().oneOf([true], 'Must Accept Terms and Conditions')
    }),



    // to handle the submit event
    handleSubmit (values) {
        //temp
        console.log('submitting the following values: ', values);
    }
    
  })(UserForm );


  
  export default FormikUserForm;


// STEP 2 - Implement Form Validation and Error Messaging

// Using Yup, set up at least two different validations for each field along with custom error codes that will display on screen when validation fails.
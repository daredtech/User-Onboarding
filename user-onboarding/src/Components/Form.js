import React from 'react';
import {withFormik, Form, Field} from 'formik';

// how the form will be rendered
function UserForm () {
    return(
        <Form> 
            <Field type='text' name='username' placeholder='username'/>
            <Field type='email' name='email' placeholder='email'/>
            <Field type='password' name='password' placeholder='password'/>        
            {/* 
            Terms of Service (checkbox)
            */}
            <label className='terms-of-service'>
            <Field type='checkbox' name='checkbox' />
            Terms of Service
            </label>
        
            <button type='submit'> Submit </button>
        </Form>
    )
}

// to wrap our UserForm inside formik component
const FormikUserForm = withFormik({

    // to connect to the handlers of the data
    mapPropsToValues({ username, email, password }) {
      return {
        username: username || "",
        email: email || "",
        password: password || ""
      };
    },

    // to handle the submit event
    handleSubmit (values) {
        //temp
        console.log('submitting the following values: ', values);
    }
    
  })(UserForm );


  
  export default FormikUserForm;
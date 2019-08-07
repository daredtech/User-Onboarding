import React from 'react';
import {withFormik, Form, Field} from 'formik';


function UserForm () {
    return(
        <Form> 
            <Field type='text' name='username' placeholder='username'/>
            <Field type='email' name='email' placeholder='email'/>
            <Field type='password' name='password' placeholder='password'/>        
            {/* 
            Terms of Service (checkbox)
            */}
            <Field type='checkbox' name='checkbox' />
            <button> Submit </button>
        </Form>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({ username, email, password }) {
      return {
        username: username || "",
        email: email || "",
        password: password || ""
      };
    },
  
  })(UserForm );
  
  export default FormikUserForm;
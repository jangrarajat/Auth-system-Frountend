import React from 'react'
import { toast } from 'react-toastify'


function ErrorMessage(msg) {
 toast.error(msg,{
    position:"top-left"
 })


}

export default ErrorMessage

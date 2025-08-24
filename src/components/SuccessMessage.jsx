 import React from 'react'
 import { toast } from 'react-toastify'


 function SuccessMessage(msg) {
 

 toast.success(msg,{
    position:"top-left"

 })
 
}
 export default SuccessMessage
 


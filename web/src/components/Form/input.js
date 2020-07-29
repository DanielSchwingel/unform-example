import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

export default function Input({ name, ...rest }){
    const { fieldName, registerField, defaultValue, error } = useField(name);
    const inputRef = useRef(null);

    useEffect(()=>{
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        })
    },[fieldName, registerField])

    return (
         <input ref={inputRef} defaultValue={defaultValue} {...rest} />
    )

} 
import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import './styles.css';

export default function Input({ name, ...rest }){
    const { fieldName, registerField, defaultValue, error, clearError  } = useField(name);
    const inputRef = useRef(null);

    useEffect(()=>{
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        })
    },[fieldName, registerField])

    return (
        <div>
            <input ref={inputRef} defaultValue={defaultValue} {...rest} onFocus={clearError}/>
            { error && <span className="error">{error}</span> }
        </div>
    )

} 
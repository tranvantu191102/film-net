import React from 'react'


const Input = (props) => {



    return (
        <div className="relative w-full">
            <label
                className={`absolute transform transition-all duration-200 ease-linear
                 ${props.value ? '-top-4 left-2 bg-primary-bg p-1' : 'top-1/2 -translate-y-1/2 left-3 '} pointer-events-none`}

            >{props.label}</label>
            <input
                type={props.type || 'text'}
                value={props?.value}
                // placeholder={props?.placeholder}
                onChange={props.onChange ? (e) => props.onChange(e) : undefined}
                onFocus={props.onFocus ? (e) => props.onFocus(e) : undefined}
                onBlur={props.onBlur ? (e) => props.onBlur(e) : undefined}
                className='px-3 py-3 w-full bg-transparent outline-none border-[1px] boder-gray-text rounded-lg'
            />
        </div>
    )
}

export default Input
import type { CSSProperties } from 'react'


/**
 * An object containing a single .current property,  
 * that will be set to the corresponding HTMLInputElement when mounted.
 */
export const inputRef = (
    BdApi.React.createRef<HTMLInputElement>()
)


const style: CSSProperties = {
    inset: 0,
    display: 'block',
    margin: 'auto',
    marginTop: '15px',

    width: '100%',
    overflow: 'hidden',
    boxSizing: 'border-box',
    fontSize: '1rem',
    lineHeight: 2,
    letterSpacing: '.04rem',

    border: 'none',
    borderRadius: 'var(--radius-xs)',
    padding: '0 var(--spacing-8)',

    color: 'var(--text-normal)',
    background: 'var(--bg-overlay-4, var(--background-tertiary))'
}


/**
 * A react input element
 * to contain and validate discord user id inputs.
 */
export default (
    <input
        ref={inputRef}
        style={style}
        required
        pattern='\d{17,19}'
        placeholder='User ID'
        onChange={
            ({ target }) => target.value = target.value.replace(/\D/g, '').slice(0, 19)
        }
    />
)
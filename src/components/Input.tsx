import type { CSSProperties } from 'react'


export const inputRef = (
    BdApi.React.createRef<HTMLInputElement>()
)


const style: CSSProperties = {
    inset: 0,
    display: 'block',
    margin: 'auto',
    marginTop: '15px',

    width: '96.5%',
    overflow: 'hidden',
    fontSize: '16px',
    lineHeight: '32px',

    border: 'none',
    borderRadius: 'var(--radius-xs)',
    padding: '0 var(--spacing-8)',

    color: 'var(--text-normal)',
    background: 'var(--bg-overlay-4, var(--background-tertiary))'
}


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
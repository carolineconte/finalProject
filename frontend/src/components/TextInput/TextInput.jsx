import './TextInput.css'

export const TextInput = ({ label, placeholder, value, attValue, type = 'text', required = false }) => {

    const handleChange = (e) => {
     attValue(e.target.value)
    }

    return (
        <div className='InputText'>
            <label className='contorno'>{label}</label>
            <input required={required} type={type} value={value} onChange={handleChange} placeholder={placeholder} />
        </div>
    )
}

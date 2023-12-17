import './Select.css'
export const InputSelect = ({label, options, value, attValue}) => {
  return (
    <div className='InputSelect'>
        <label id='selectLabel'>{label}</label>
        <select onChange={e => attValue(e.target.value)} value={value} required >
          <option value="">select</option>
            {
                options.map(option => <option key={option} value={option}>{option}</option> )
            }
        </select>
    </div>
  )
}

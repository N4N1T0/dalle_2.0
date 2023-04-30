import PropTypes from 'prop-types';

const FormField = ({ labelName, type, name, placeholder, value, handleChange, isSupriseMe, handleSupriseMe }) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label htmlFor="name" className='block text-sm font-medium text-gray-900'>{labelName}</label>
        {isSupriseMe && (
          <button type='button' onClick={handleSupriseMe} className='font-semiblold text-xs bg-[#ececf1] py-1 px-2 rounded-[5px] text-black'>Suprise Me</button>
        )}
      </div>
      <input type={type} name={name} id={name} placeholder={placeholder} value={value} onChange={handleChange} required className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#4649ff] outline-none block w-full p-3'  />
    </div>
  )
}

FormField.propTypes = {
  labelName: PropTypes.string, 
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  isSupriseMe: PropTypes.bool,
  handleSupriseMe: PropTypes.func
}

export default FormField
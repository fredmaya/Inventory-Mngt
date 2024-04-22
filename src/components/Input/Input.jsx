import './Input.scss'
import error from '../../assets/images/Icons/error-24px.svg'

function Input({ type, name, label, onChange, value, errors }) {
    console.log(errors)
    return (

        <>
            <label htmlFor={name} className="label">
                <h4 className='label__title'>{label}</h4>
                <input type={type} name={name} className={`label__input ${errors ? 'input-error' : ''}`}
                    placeholder={label === "Quantity" ? "0" :
                                 label === "Phone Number" ? "+1 (555) 123-4567" 
                                 : label} 
                                 onChange={onChange} value={value}

                />
                {errors && (<div className='error'>
                    <img className='error_img' src={error} alt="error" />
                    {errors}</div>)}
            </label>




        </>
    )

}
export default Input
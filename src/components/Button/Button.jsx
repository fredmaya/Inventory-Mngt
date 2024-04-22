import './Button.scss'
function Button({type,text,variant, onClick}){
    //variant: primary, secondary or delete
    return(
        <button type={type} className={`button button--${variant}`} onClick={onClick || onClick}>
            <div className="button__text">{text}</div>
        </button>
    )
}
export default Button;
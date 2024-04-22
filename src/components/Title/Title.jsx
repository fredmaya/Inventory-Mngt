import './Title.scss'
import { useNavigate } from "react-router-dom"
function Title({ icon, text }) {
    const navigate = useNavigate()
    return (
        <div className='title'>

            <img onClick={() => navigate(-1)} src={icon} alt={text} />

            <h2 className='title__text'>{text}</h2>
        </div>
    )
}
export default Title
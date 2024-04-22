// Styles
import "./NotFoundPage.scss";

// Libraries
import { useNavigate, Link } from "react-router-dom";

// components
import Button from "../../components/Button/Button";
function NotFoundPage() {

    const navigate = useNavigate();

  return (
    <div  className="NF-body">
      <h1>404 Not Found </h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">
        <Button type='button' text='Go to Home Page' variant='goBack' /> 
      </Link>
    </div>
  )
}

//Merge with dev
export default NotFoundPage

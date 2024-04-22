import Form from "../../components/Form/Form"
import Title from "../../components/Title/Title"
import arrow from '../../assets/images/Icons/arrow_back-24px.svg'
import axios from "axios"
import { useNavigate } from "react-router";

import './WarehouseAdd.scss'
function WarehouseAdd() {
  const navigate = useNavigate();
  const URL= `${import.meta.env.VITE_BASE_URL}`;

  const handledAddWarehouse = async (formData) => {
    
   console.log(formData)
     
    try {
 
      const response = await axios.post(`${URL}warehouses`, formData);
      const Answer = response.data;
      alert(`Warehouse ${Answer} created successfully`)
      
      navigate(-1);
      

    }
    catch (error) {
      console.error("Error posting warehouses:", error);
    }

  };




  return (
    <div className="add-section">
      <Title text="Add New Warehouse" icon={arrow} />
      <Form buttonText={"+ Add Warehouse"} handledAddWarehouse={handledAddWarehouse} />
    </div>
  )
}
export default WarehouseAdd
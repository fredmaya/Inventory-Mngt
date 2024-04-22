import InventoryForm from "../../components/InventoryForm/InventoryForm"
import Title from "../../components/Title/Title"
import arrow from '../../assets/images/Icons/arrow_back-24px.svg'
import axios from "axios"
import './InventoryAdd.scss'

import { useNavigate } from "react-router";
function InventoryAdd() {

  const navigate = useNavigate();
  const URL = `${import.meta.env.VITE_BASE_URL}`;

  const handledAddInventory = async (formData) => {

      try {
      const response = await axios.post(`${URL}inventories`, formData);
      const Answer = response.data;
      alert(`Item ${Answer} created successfully`);
      navigate(-1);
    } catch (error) {
      console.error("Error posting item: ", error);
    }

  };


  return (
    <div className="add-inventory">
      <Title text="Add New Inventory Item" icon={arrow} />
      <InventoryForm buttonText={"+ Add Item"} handledAddInventory={handledAddInventory} />
    </div>
  )
}
export default InventoryAdd
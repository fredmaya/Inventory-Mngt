import Form from "../../components/Form/Form"
import Title from "../../components/Title/Title"
import arrow from '../../assets/images/Icons/arrow_back-24px.svg'
import './WarehouseEdit.scss'
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
function WarehouseEdit() {
  const URL = `${import.meta.env.VITE_BASE_URL}`;
  const navigate = useNavigate();
  const { warehouseId } = useParams();
  const [warehouse, setWarehouse] = useState([])



  useEffect(() => {
    const fetchwarehouseDetails = async () => {
      if (warehouseId) {
        try {
          const response = await axios.get(`${URL}warehouses/${warehouseId}`);

          const warehouse = response.data;

          setWarehouse({
            warehouse_name: warehouse.warehouse_name,
            address: warehouse.address,
            city: warehouse.city,
            country: warehouse.country,
            contact_name: warehouse.contact_name,
            contact_position: warehouse.contact_position,
            contact_phone: warehouse.contact_phone,
            contact_email: warehouse.contact_email
          });

        }
        catch (error) {
          console.error("Error getting warehouses:", error);
        }
      }
    };

    fetchwarehouseDetails();

  }, []);




  const handledEditWarehouse = async (formData) => {

    try {

      const response = await axios.put(`${URL}warehouses/${warehouseId}`, formData);
      const warehouse = response.data;

      alert(`Warehouse ${warehouse.warehouse_name} was updated successfully`)
      navigate(-1);



    }
    catch (error) {
      console.error("Error updating warehouses:", error);
    }


  };


  return (
    <div className="edit-section">
      <Title text="Edit Warehouse" icon={arrow} />
      <Form buttonText={"Save"} handledEditWarehouse={handledEditWarehouse} warehouse={warehouse} mode={"edit"} />
    </div>
  )
}
export default WarehouseEdit
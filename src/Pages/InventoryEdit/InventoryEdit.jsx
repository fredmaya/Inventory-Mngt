import InventoryForm from "../../components/InventoryForm/InventoryForm"
import Title from "../../components/Title/Title"
import arrow from '../../assets/images/Icons/arrow_back-24px.svg'
import axios from "axios"
import './InventoryEdit.scss'
import { useState, useEffect, } from "react"
import { useParams, useNavigate } from "react-router";

function InventoryEdit() {
    const navigate = useNavigate();
    const URL = `${import.meta.env.VITE_BASE_URL}`;

    const { itemId } = useParams();
    const [item, setItem] = useState([])



    useEffect(() => {

        const fetchItemDetails = async () => {
            if (itemId) {
                try {

                    const response = await axios.get(`${URL}inventories/item/${itemId}`);

                    const item = response.data;
                    setItem({
                        warehouse_id: item.warehouse_id,
                        item_name: item.item_name,
                        description: item.description,
                        category: item.category,
                        status: item.status,
                        quantity: item.quantity
                    });
                }
                catch (error) {
                    console.error("Error getting items:", error);
                }
            }
        };

        fetchItemDetails();

    }, []);


    const handledEditInventory = async (formData) => {



        try {
        
            const response = await axios.put(`${URL}inventories/${itemId}`, formData);
            const Answer = response.data;

            alert(`Item ${Answer.item_name} was updated successfully`)
            navigate(-1);

        }
        catch (error) {
            console.error("Error updating items:", error);
        }


    };


    return (
        <div className="edit-section">
            <Title text="Edit item" icon={arrow} />
            <InventoryForm buttonText={"Save"} handledEditInventory={handledEditInventory} item={item} mode={"edit"} />
        </div>
    )
}
export default InventoryEdit
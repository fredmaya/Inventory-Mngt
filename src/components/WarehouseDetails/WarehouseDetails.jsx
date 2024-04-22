//style
import "./WarehouseDetails.scss";

//Library
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

//Components
import WarehouseInventoryItem from "../WarehouseInventoryItem/WarehouseInventoryItem";

export default function WarehouseDetails() {
    const navigate = useNavigate();
    const handleClick = (warehouseId) => navigate(`/warehouses/edit/${warehouseId}`);
    const [warehouse, setwarehouse] = useState({});
    const [inventory, setInventory] = useState([]);

    const params = useParams();
    //get sepcific warehouse's inventory list
    async function getWarehouseInventory() {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}inventories/${params.id}`
            )
            console.log(response.data);
            setInventory(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        //get warehousedetails by id from backend
        async function getWarehouseData() {
            try {
                const respone = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}warehouses/${params.id}`
                );
                if (!(respone.data).message)
                    setwarehouse(respone.data);
                else
                    navigate('*')

            } catch (error) {
                console.log(error);
            }
        }
        getWarehouseData();
        getWarehouseInventory()
    }, []);

    //delete handle function
    async function handleDeleteInventory(inventoryId) {
        try {
            const response = await axios.delete(
                `http://localhost:8080/inventories/${inventoryId}`

            );
            if (response.status === 200) {
                console.log(`Successfully deleted item with ID ${inventoryId}`);
                getWarehouseInventory();
            } else {
                console.error(response.statusText);
            }
        } catch (erro) {
            console.log(erro);
        }
    }

    useEffect(() => {
        getWarehouseInventory();
    }, []);

    return (
        <div>
            <section className="wH-details">
                <div className="wH-details__title-container">
                    <Link to="/" className="wH-details__title">
                        {warehouse.warehouse_name}
                    </Link>

                    <div className="wH-details__icon"
                        onClick={() => handleClick(warehouse.id)}>
                        <p className="wH-details__icon--text">Edit</p>
                    </div>
                </div>

                <div className="wH-details__information">
                    <div className="wH-details__block wH-details__block--address">
                        <p className="wH-details__block-title">
                            warehouse address
                        </p>
                        <p className="wH-details__block-text">
                            {`${warehouse.address}, ${warehouse.city}, ${warehouse.country}`}
                        </p>
                    </div>
                    <div className="wH-details__block wH-details__block--name">
                        <p className="wH-details__block-title ">contact name</p>
                        <p className="wH-details__block-text">
                            {warehouse.contact_name}
                        </p>
                        <p className="wH-details__block-text">
                            {warehouse.contact_position}
                        </p>
                    </div>
                    <div className="wH-details__block wH-details__block--contact">
                        <p className="wH-details__block-title">
                            contact information
                        </p>
                        <p className="wH-details__block-text">
                            {warehouse.contact_phone}
                        </p>
                        <p className="wH-details__block-text">
                            {warehouse.contact_email}
                        </p>
                    </div>
                </div>
                <WarehouseInventoryItem inventoryList={inventory} reRender={getWarehouseInventory} />
            </section>
        </div>
    );
}

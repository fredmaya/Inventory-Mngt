// Components
import WarehouseListItem from "../WarehouseListItem/WarehouseListItem";

// Styles
import "./WarehouseList.scss";

// Libraries
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function WarehouseList() {
  const navigate = useNavigate();

  //useState to set the warehouse list
  const [warehouseList, setWarehouseList] = useState([]);

  //get warehouse list from database
  async function getWarehouse() {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}warehouses`
    );
    setWarehouseList(response.data);
  }

  //delete handle function
  async function handleDeleteWarehouse(warehouseId) {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}warehouses/${warehouseId}`
      );
      if (response.status === 200) {
        console.log(`Successfully deleted warehouse with ID ${warehouseId}`);
        getWarehouse();
      } else {
        console.error(response.statusText);
      }
    } catch (erro) {
      console.log(erro);
    }
  }

  useEffect(() => {
    getWarehouse();
  }, []);

  useEffect(() => {
    getWarehouse();
  }, []);

  return (
    <section className="warehouse-section">
      <div className="warehouse__block">
        <h1 className="warehouse__heading">Warehouses</h1>
        <form className="warehouse__form">
          <input
            type="text"
            className="warehouse__input"
            placeholder="Search..."
          />
          <Link to="/warehouses/add">
            <button className="warehouse__button">+ Add New WareHouse</button>
          </Link>
        </form>
      </div>
      <div className="td__container">
        <div className="t__header">
          <div className="t__header--left">
            <p className="field">Warehouse</p>
            <p className="field">Address</p>
          </div>
          <div className="t__header--right">
            <p className="field">Contact Name</p>
            <p className="field">Contact Information</p>
          </div>
        </div>
        <p className="field field--action">Action</p>
      </div>
      <ul>
        {warehouseList &&
          warehouseList.map((warehouse) => (
            <WarehouseListItem
              key={warehouse.id}
              warehouseId={warehouse.id}
              warehouseName={warehouse.warehouse_name}
              address={warehouse.address}
              city={warehouse.city}
              country={warehouse.country}
              contactName={warehouse.contact_name}
              contactPosition={warehouse.contact_position}
              contactPhone={warehouse.contact_phone}
              contactEmail={warehouse.contact_email}
              handleDelete={handleDeleteWarehouse}
              reRender={getWarehouse}
            />
          ))}
      </ul>
    </section>
  );
}

export default WarehouseList;

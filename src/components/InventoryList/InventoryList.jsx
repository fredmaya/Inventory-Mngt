// Components
import InventoryListItem from "../InventoryListItem/InventoryListItem";

// Styles
import "./InventoryList.scss";

// Libraries
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function InventoryList() {
  //useState to set the inventory list
  const [inventoryList, setInventoryList] = useState([]);

  //get inventory list from database
  async function getInventory() {
    const response = await axios.get(`http://localhost:8080/inventories`);
    setInventoryList(response.data);
  }

  //delete handle function
  async function handleDeleteInventory(inventoryId) {
    try {
      const response = await axios.delete(
        `http://localhost:8080/inventories/${inventoryId}`
      );
      if (response.status === 200) {
        console.log(`Successfully deleted item with ID ${inventoryId}`);
        getInventory();
      } else {
        console.error(response.statusText);
      }
    } catch (erro) {
      console.log(erro);
    }
  }

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <section className="inventory-section">
      <div className="inventory__block">
        <h1 className="inventory__heading">Inventory</h1>
        <form className="inventory__form">
          <input
            type="text"
            className="inventory__input"
            placeholder="Search..."
          />
          <Link to="/inventories/add">
            <button className="inventory__button">+ Add New Item</button>
          </Link>
        </form>
      </div>
      <div className="inventory-td__container">
        <div className="inventory-t__header">
          <div className="inventory-t__header--left1">
            <p className="field">INVENTORY ITEM</p>
          </div>
          <div className="inventory-t__header--left2">
            <p className="field">CATEGORY</p>
          </div>
          <div className="inventory-t__header--center">
            <p className="field">STATUS</p>
          </div>
          <div className="inventory-t__header--right">
            <p className="field">QTY</p>
          </div>
          <div className="inventory-t__header--right2">
            <p className="field">WAREHOUSE</p>
          </div>
          <div className="inventory-t__header--last">
            <p className="field">Action</p>
          </div>
        </div>
      </div>

      <ul>
        {inventoryList.map((inventory) => {
          return (
            <InventoryListItem
              key={inventory.id}
              inventoryId={inventory.id}
              warehouseName={inventory.warehouse_name} // Pass warehouseName to InventoryListItem
              item_name={inventory.item_name}
              description={inventory.description}
              category={inventory.category}
              status={inventory.status}
              quantity={inventory.quantity}
              handleDelete={handleDeleteInventory}
              reRender={getInventory}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default InventoryList;

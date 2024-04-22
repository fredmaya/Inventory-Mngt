//style
import "./InventoryDetails.scss";

//Library
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function InventoryDetail() {
  const navigate = useNavigate();
  const handleClick = (itemId) => navigate(`/inventories/edit/${itemId}`);
  const [dataBase, setDataBase] = useState({});

  const params = useParams();

  useEffect(() => {
    //get iventorydetails by id from backend
    async function getWarehouseData() {
      try {
        const respone = await axios.get(
          `${import.meta.env.VITE_BASE_URL}inventories/item/${params.id}`
        );
       
        if (!(respone.data).message) 
        setDataBase(respone.data)
        else
        navigate('*')

      } catch (error) {
        console.log(error);
      }
    }
    getWarehouseData();
  }, []);
  return (
    <div>
      <section className="inventory-details">
        <div className="inventory-details__title-container">
          <Link to="/inventories" className="inventory-details__title">
            {dataBase.item_name}
          </Link>
          <div
            className="inventory-details__icon"
            onClick={() => handleClick(dataBase.id)}
          >
            <p className="inventory-details__icon--text">Edit</p>
          </div>
        </div>

        <div className="inventory-details__information">
          <div className="inventory-details__block inventory-details__block--address">
            <p className="inventory-details__block-title">Item description</p>
            <p className="inventory-details__block-text">
              {`${dataBase.description}`}
            </p>
            <p className="inventory-details__block-title">category</p>
            <p className="inventory-details__block-text">
              {`${dataBase.category}`}
            </p>
          </div>
          <div className="inventory-details__block inventory-details__block--name">
            <p className="inventory-details__block-title ">Status</p>{" "}
            <div className="inventory-details__block--status">
              <p
                className={`inventory-details__block-text${
                  dataBase.status === "In Stock" ? "--inStock" : "--outStock"
                }`}
              >
                {dataBase.status}
              </p>
            </div>
            <p className="inventory-details__block-title ">Warehouse</p>
            <p className="inventory-details__block-text">
              {dataBase.warehouse_name}
            </p>
          </div>
          <div className="inventory-details__block inventory-details__block--contact">
            <p className="inventory-details__block-title">Quantity</p>
            <p className="inventory-details__block-text">{dataBase.quantity}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

//style
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./WarehouseInventoryItem.scss";
import DeleteModal from "../DeleteModal/DeleteModal";
import React from "react";

function WarehouseInventoryItem({ inventoryList, reRender }) {
    const navigate = useNavigate();

    const inventoryListValidated = !(inventoryList.message) ? inventoryList : [];
    console.log(inventoryListValidated)

    const handleClick = (itemId) => navigate(`/inventories/edit/${itemId}`);

    return (
        <div>
            <section className="inventory table-view">
                <div className="inventory__list">
                    <p className="inventory__item table-view__title table-view__title--one">
                        inventory item
                    </p>
                    <p className="inventory__item table-view__title table-view__title--two">
                        catagory
                    </p>
                </div>
                <div className="inventory__list">
                    <p className="inventory__item table-view__title table-view__title--three">
                        status
                    </p>
                    <p className="inventory__item table-view__title table-view__title--four">
                        quantity
                    </p>
                </div>
                <div className="inventory__list inventory__list--mod">
                    <p className="inventory__item table-view__title table-view__title--five">
                        actions
                    </p>
                </div>
            </section>
            <ul>
                {
                    inventoryListValidated?.map((inventory) => (
                        <div key={inventory.id} className="inventory">
                            <div className="inventory__list">
                                <div className="inventory__item">
                                    <p className="inventory__title">
                                        inventory item
                                    </p>
                                    <div className="inventory__item--wid">
                                        <Link to={`/inventories/item/${inventory.id}`}>
                                            <p className="inventory__links ">
                                                {inventory.item_name}
                                            </p>
                                        </Link>
                                        <p className="inventory__links--icon"></p>
                                    </div>
                                </div>
                                <div className="inventory__item">
                                    <p className="inventory__title">catagory</p>
                                    <p className="inventory__links inventory__links--mod">
                                        {inventory.category}
                                    </p>
                                </div>
                            </div>
                            <div className="inventory__list">
                                <div className="inventory__item">
                                    <p className="inventory__title">status</p>
                                    <p
                                        className={`inventory__links inventory__links--btn 
                  ${inventory.status === "Out of Stock" ? "outOfstock" : ""}`}
                                    >
                                        {inventory.status}
                                    </p>
                                </div>
                                <div className="inventory__item">
                                    <p className="inventory__title">qty</p>
                                    <p className="inventory__links inventory__links--qty">
                                        {inventory.quantity}
                                    </p>
                                </div>
                            </div>
                            <div className="inventory__list inventory__list--mod">
                                <DeleteModal
                                    className="inventory__icon--left"
                                    dataId={inventory.id}
                                    dataName={inventory.item_name}
                                    dataType="inventories"
                                    reRender={reRender}
                                />

                                {/* <div className="inventory__icon--left"
                            ></div> */}
                                {/* left delete and right edit */}

                                <div
                                    className="inventory__icon--right"
                                    onClick={() => handleClick(inventory.id)}
                                ></div>
                            </div>
                        </div>
                    ))}
            </ul>
        </div>
    );
}

export default WarehouseInventoryItem;

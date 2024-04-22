// Styles
import { Link, useNavigate } from "react-router-dom";
import "./WarehouseListItem.scss";
import DeleteModal from "../DeleteModal/DeleteModal";

function WarehouseListItem({
    warehouseId,
    warehouseName,
    address,
    city,
    country,
    contactName,
    contactPosition,
    contactPhone,
    contactEmail,
    reRender
}) {
    const navigate = useNavigate();

    const handleClick = () => navigate(`/warehouses/edit/${warehouseId}`);

    return (
            <li className="t-row">
                <div className="data-cell">
                    <div className="t-row--left">
                        <div className="t-data">
                            <p className="t-data__field">Warehouse</p>
                            <Link to={`/warehouses/${warehouseId}`}>
                                <p className="t-data__value t-data__value--highlighted">
                                    {warehouseName}
                                    <span className="links--icon"></span>
                                </p>
                            </Link>
                        </div>
                        <div className="t-data">
                            <p className="t-data__field">Address</p>
                            <p className="t-data__value">
                                {`${address} ${city} ${country}`}
                            </p>
                        </div>
                    </div>
                    <div className="t-row--right">
                        <div className="t-data">
                            <p className="t-data__field">Contact Name</p>
                            <p className="t-data__value">{contactName}</p>
                        </div>
                        <div className="t-data">
                            <p className="t-data__field">Contact Information</p>
                            <p className="t-data__value">
                                {`${contactPhone} ${contactEmail}`}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="warehouse__list--mod">
                    <DeleteModal className="warehouse__icon--left" dataId={warehouseId} dataName={warehouseName} dataType="warehouses" reRender={reRender}/>
                    <div className="warehouse__icon--right" onClick={() => handleClick(warehouseId)}></div>
                </div>
            </li>
    );
}

export default WarehouseListItem;

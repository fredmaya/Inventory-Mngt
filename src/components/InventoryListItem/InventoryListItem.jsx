// Styles
import { Link, useNavigate } from "react-router-dom";
import "./InventoryListItem.scss";
import DeleteModal from "../DeleteModal/DeleteModal";

function InventoryListItem({
  inventoryId,
  item_name,
  reRender,
  category,
  status,
  quantity,
  warehouseName,
}) {
  const navigate = useNavigate();

  const handleClick = () => navigate(`/inventories/edit/${inventoryId}`);
  return (
    <div>
      <li className="inventory__t-row--mobile">
        <div className="data-cell">
          <div className="t-row--left">
            <div className="t-data">
              <p className="t-data__field">inventory item</p>
              <Link to={`/inventories/item/${inventoryId}`}>
                <p className="t-data__value t-data__value--highlighted">
                  {item_name}
                  <span className="links--icon"></span>
                </p>
              </Link>
            </div>
            <div className="t-data">
              <p className="t-data__field">category</p>
              <p className="t-data__value">{`${category}`}</p>
            </div>
          </div>

          <div className="t-row--right">
            <div className="t-data">
              <p className="t-data__field">status</p>
              <div className="inventory-details__block--sts">
                <p
                  className={`t-data__value${
                    status === "In Stock" ? "--inStock" : "--outStock"
                  }`}
                >
                  {status}
                </p>
              </div>
            </div>
            <div className="t-data">
              <p className="t-data__field">qty</p>
              <p className="t-data__value--qtd">{`${quantity}`}</p>
            </div>
            <div className="t-data">
              <p className="t-data__field">WAREHOUSE</p>
              <p className="t-data__value">{`${warehouseName}`}</p>
            </div>
          </div>
        </div>
        <div className="inventory__list--mod">
          <DeleteModal
            className="inventory__icon--left"
            dataId={inventoryId}
            dataName={item_name}
            dataType="inventories"
            reRender={reRender}
          />
          <div
            className="inventory__icon--right"
            onClick={() => handleClick(inventoryId)}
          ></div>
        </div>
      </li>
      <div className="inventory__container--tablet">
        <li className="inventory__t-row--tablet">
          <div className="inventory__t-row--left1">
            <Link to={`/inventories/item/${inventoryId}`}>
              <p>
                {item_name}
                <span className="links--icon"></span>
              </p>
            </Link>
          </div>
          <div className="inventory__t-row--left">
            <p>{`${category}`}</p>
          </div>
          <div className="inventory--status--block">
            <div className="inventory--status">
              <p
                className={`t-data__value${
                  status === "In Stock" ? "--inStock" : "--outStock"
                }`}
              >
                {status}
              </p>
            </div>
          </div>
          <div className="inventory__t-row--right">
            <p>{`${quantity}`}</p>
          </div>
          <div className="inventory__t-row--last">
            <p>{`${warehouseName}`}</p>
          </div>
          <div className="inventory__list--mod">
            <DeleteModal
              className="inventory__icon--left"
              dataId={inventoryId}
              dataName={item_name}
              dataType="inventories"
              reRender={reRender}
            />
            <div
              className="inventory__icon--right"
              onClick={() => handleClick(inventoryId)}
            ></div>
          </div>
        </li>
      </div>
    </div>
  );
}

export default InventoryListItem;

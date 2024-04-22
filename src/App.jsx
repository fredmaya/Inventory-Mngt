//styles
import "./App.scss";

//Libraries
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import Header from "./components/Header/Header";
import WarehousesPage from "./Pages/WarehousesPage/WarehousesPage.jsx";
import WarehouseList from "./components/WarehouseList/WarehouseList.jsx";
import WarehouseDetails from "./components/WarehouseDetails/WarehouseDetails.jsx";
import InventoryPage from "./Pages/InventoryPage/InventoryPage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import WarehouseAdd from "./Pages/WarehouseAdd/WarehouseAdd.jsx";
import WarehouseEdit from "./Pages/WarehouseEdit/WarehouseEdit.jsx";
import InventoryAdd from "./Pages/InventoryAdd/InventoryAdd.jsx";
import InventoryEdit from "./Pages/InventoryEdit/InventoryEdit.jsx";
import InventoryDetails from "./components/InventoryDetails/InventoryDetails.jsx";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage.jsx"

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<WarehousesPage />} />
          <Route path="/warehouses" element={<WarehouseList />} />
          <Route path="/warehouses/:id" element={<WarehouseDetails />} />
          <Route path="/warehouses/add" element={<WarehouseAdd />} />
          <Route
            path="/warehouses/edit/:warehouseId"
            element={<WarehouseEdit />}
          />
          <Route path="/inventories" element={<InventoryPage />} />
          <Route path="/inventories/item/:id" element={<InventoryDetails />} />
          <Route path="/inventories/add" element={<InventoryAdd />} />
          <Route path="/inventories/edit/:itemId" element={<InventoryEdit />} />
          <Route path="*" element={<NotFoundPage />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;

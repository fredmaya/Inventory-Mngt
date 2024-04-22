import Input from "../Input/Input"
import Button from "../Button/Button"
import axios from "axios";
import './InventoryForm.scss'
import error from '../../assets/images/Icons/error-24px.svg'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



function InventoryForm({ buttonText,
    handledAddInventory,
    handledEditInventory,
    mode,
    item }) {
    const navigate = useNavigate()
    const URL = `${import.meta.env.VITE_BASE_URL}`;
    const [category, setCategory] = useState()
    const [warehouse, setWarehouse] = useState()
    const [formData, setFormData] = useState(item || {
        warehouse_id: '',
        item_name: '',
        description: '',
        category: '',
        status: 'In Stock',
        quantity: ''
    });

    const [errors, setErrors] = useState({});


    useEffect(() => {
        const fetchCategories = async () => {

            try {

                const response = await axios.get(`${URL}inventories/category`);
                const category = response.data;

                const response1 = await axios.get(`${URL}warehouses`);
                const warehouse = response1.data;

                setCategory(category);
                setWarehouse(warehouse)


            }
            catch (error) {
                console.error("Error getting category:", error);
            }

        };

        fetchCategories();
    }, []);



    useEffect(() => {
        if (mode == 'edit' && item) {
            setFormData(item)
        }
    }, [mode, item]);


    const validateForm = () => {
        let formIsValid = true;
        let newErrors = {};

        const fieldsToValidate = ['item_name', 'description', 'category', 'status', 'quantity', 'warehouse_id'];

        fieldsToValidate.forEach(field => {

            if (field === 'category' && (!formData[field] || formData[field] === 'Please select')) {
                newErrors[field] = "Field is required";
                formIsValid = false;
            }


            else if (!formData[field]) {
                newErrors[field] = "Field is required";
                formIsValid = false;
            }

            if (formData['status'] !== 'Out of Stock' && (parseInt(formData['quantity'], 10) <= 0)) {
                newErrors['quantity'] = "Field is required and must be greater than 0";
                formIsValid = false;
            }

        }

        );

        setErrors(newErrors);
        return formIsValid;
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log(formData)
            if (mode === 'edit') {

                handledEditInventory(formData);
            } else {

                handledAddInventory(formData);
            }
        }
    };





    const handleItemShow = (e) => {


        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));

        if (errors[name] && value !== '') {
            setErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors[name];
                return newErrors;
            });
        }

    };


    const inputProps = (fieldName) => ({

        value: formData[fieldName],
        onChange: handleItemShow,
        errors: errors[fieldName]


    });
    console.log(errors)
    return (

        <form className="item-form" id="form-items" onSubmit={handleSubmit} >
            <div className="item-form__primary">
                <div className="item-form__container">
                    <h3 className="item-form__title" >Item Details</h3>
                    <Input type="text" label="Item Name" name="item_name"
                        {...inputProps("item_name")}
                    />
                    <label htmlFor="description" className="label">
                        <h4 className='label__title'>Description</h4>
                        <textarea
                            className={`label__input label__input--resize ${errors.description ? 'input-error' : ''}`}
                            // className="label__input label__input--resize" 
                            name="description"
                            id="description"
                            placeholder="Please enter a brief item description..."
                            value={mode === 'edit' ? formData["description"] : undefined} onChange={handleItemShow}></textarea>
                        {errors.description && (<div className='error'>
                            <img className='error_img' src={error} alt="error" />
                            {errors.description}</div>)}
                    </label>
                    <h4 className='label'>Category</h4>

                    <select
                        name="category"
                        id="category"
                        className={`label__select ${errors.category ? 'input-error' : ''}`}
                        value={formData.category}
                        onChange={handleItemShow}
                    >
                        <option value="">Please select</option>
                        {category?.map((cat) => (
                            <option
                                key={cat.category}
                                value={cat.category}
                                className="label__option"
                            >
                                {cat.category}
                            </option>
                        ))}
                    </select>
                    {errors.category && (<div className='error'>
                        <img className='error_img' src={error} alt="error" />
                        {errors.category}</div>)}


                </div>
                <div className='item-form__border'></div>
                <div className="item-form__container">
                    <h3 className="item-form__title" >Item Availability</h3>
                    <h4 className='label'>Status</h4>
                    <div className="item-form__radio">
                        <div className="item-form__radio-container">

                            <input required type="radio"
                                id="instock"
                                name="status"
                                value="In Stock"

                                checked={formData?.status === 'In Stock'}
                                onChange={handleItemShow}


                            />
                            <label htmlFor="instock" className="label__info">In Stock</label>

                        </div>
                        <div className="item-form__radio-container">

                            <input required type="radio"
                                id="outstock"
                                name="status"
                                value="Out of Stock"

                                checked={formData?.status === 'Out of Stock'}
                                onChange={handleItemShow} />
                            <label htmlFor="outstock" className="label__info">Out Stock</label>
                        </div>
                    </div>
                    {formData.status === 'In Stock' && (
                        <Input type="number" label="Quantity" name="quantity" {...inputProps("quantity")} />
                    )}


                    <h4 className='label'>Warehouse</h4>



                    <select name="warehouse_id" id="warehouse_id"
                        className={`label__select ${errors.warehouse_id ? 'input-error' : ''}`}
                        onChange={handleItemShow}
                        value={formData.warehouse_id} >
                        <option value="">Please select</option>
                        {
                            warehouse?.map((wh) => (
                                <option key={wh.id} value={wh.id}>{wh.warehouse_name}</option>
                            ))
                        }
                    </select>
                    {errors.warehouse_id && (<div className='error'>
                        <img className='error_img' src={error} alt="error" />
                        {errors.warehouse_id}</div>)}
                </div>
            </div>
            <div className="item-form__container-buttons">

                <Button onClick={() => navigate(-1)} type="button" text="Cancel" variant="secondary" />

                <Button type="submit" text={buttonText} variant="primary" />
            </div>
        </form>

    )
}
export default InventoryForm
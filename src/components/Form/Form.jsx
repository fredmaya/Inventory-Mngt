import Input from "../Input/Input"
import Button from "../Button/Button"
import './Form.scss'
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
function Form({ buttonText,
    handledAddWarehouse,
    handledEditWarehouse,
    mode,
    warehouse }) {

    const [formData, setFormData] = useState(warehouse || {
        warehouse_name: '',
        address: '',
        city: '',
        country: '',
        contact_name: '',
        contact_position: '',
        contact_phone: '',
        contact_email: ''
    });


    const [errors, setErrors] = useState({});


    const navigate = useNavigate();
    useEffect(() => {
        if (mode == 'edit' && warehouse) {
            setFormData(warehouse)

        }
    }, [mode, warehouse]);

    const validateForm = () => {
        let formIsValid = true;
        let newErrors = {};

        const fieldsToValidate = ['warehouse_name', 'address', 'city', 'country', 'contact_name', 'contact_position', 'contact_phone', 'contact_email'];

        fieldsToValidate.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = "Field is required";
                formIsValid = false;
            }
        });

        // email validation
        if (formData.contact_email) {
            //regular exp
            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!emailRegex.test(formData.contact_email)) {
                newErrors.contact_email = "Invalid email format";
                formIsValid = false;
            }
        }
        //phone number
        if (formData.contact_phone) {
            //regular exp
            const phoneRegex = /^\+\d{1,2}\s\(\d{3}\)\s\d{3}-\d{4}$/;
            if (!phoneRegex.test(formData.contact_phone)) {
                newErrors.contact_phone = "Invalid phone number format";
                formIsValid = false;
            }
        }

        setErrors(newErrors);
        return formIsValid;
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {

            if (mode === 'edit') {

                handledEditWarehouse(formData);
            } else {

                handledAddWarehouse(formData);
            }
        }
    };



    const handleWarehouseShow = (e) => {


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
        onChange: handleWarehouseShow,
        errors: errors[fieldName]


    });


    return (

        <form className="warehouse-form" id="form" onSubmit={handleSubmit}>
            <div className="warehouse-form__primary">
                <div className="warehouse-form__container">
                    <h3 className="warehouse-form__title" >Warehouse Details</h3>
                    <Input type="text" label="Warehouse Name" name="warehouse_name"
                        {...inputProps("warehouse_name")} />
                    <Input type="text" label="Street Address" name="address"
                        {...inputProps("address")} />
                    <Input type="text" label="City" name="city"
                        {...inputProps("city")} />
                    <Input type="text" label="Country" name="country"
                        {...inputProps("country")} />
                </div>
                <div className='warehouse-form__border'></div>
                <div className="warehouse-form__container">
                    <h3 className="warehouse-form__title" >Contact Details</h3>
                    <Input type="text" label="Contact Name" name="contact_name"
                        {...inputProps("contact_name")} />
                    <Input type="text" label="Position" name="contact_position"
                        {...inputProps("contact_position")} />
                    <Input type="text" label="Phone Number" name="contact_phone"
                        {...inputProps("contact_phone")} />
                    <Input type="email" label="Email" name="contact_email"
                        {...inputProps("contact_email")} />
                </div>
            </div>
            <div className="warehouse-form__container-buttons">

                <Button onClick={() => navigate(-1)} type="button" text="Cancel" variant="secondary" />

                <Button type="submit" text={buttonText} variant="primary" />
            </div>
        </form>

    )
}
export default Form
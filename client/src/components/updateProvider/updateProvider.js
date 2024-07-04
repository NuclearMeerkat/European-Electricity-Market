import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from "react-bootstrap";
import { useEffect } from "react";
import "./updateProvider.css";
import { countries } from "../resources/countries";

const UpdateProvider = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        country: "",
        market_share: 0,
        renewable_energy_percentage: 0,
        yearly_revenue: 0
    });

    const [errors, setErrors] = useState({});

    const fetchProvider = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/provider/${id}`);
            const data = await response.json();
            setFormData(data);
        } catch (error) {
            console.error("error while fetching provides:", error.message);
        }
    }
    
    useEffect(() => {
        fetchProvider();
    }, [id]);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const fetchProviders = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/provider");
            const providers = await response.json();
            return providers;
        } catch (error) {
            console.error("Error fetching providers:", error);
            return [];
        }
    };

    const validateForm = async() => {
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = "Name is required.";
        } else {
            const providers = await fetchProviders();
            const nameExists = providers.some(provider => provider.name === formData.name);
            if (nameExists) {
                newErrors.name = "Provider with this name already exists.";
            }
        }

        if (!formData.country) {
            newErrors.country = "Country is required.";
        }

        if (formData.renewable_energy_percentage < 0 || formData.renewable_energy_percentage > 100) {
            newErrors.renewable_energy_percentage = "Renewable energy percentage must be between 0 and 100.";
        }

        if (formData.renewable_energy_percentage === 0) {
            newErrors.renewable_energy_percentage = "Renewable energy percentage is required.";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = await validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log("Form Data Submitted: ", formData);

        try {
            const response = await fetch(`http://localhost:5000/api/provider/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to post provider');
            }

            const data = await response.json(response);
            console.log(data);
            navigate("/"); 
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
            <div className="center-form">
                <h1>Update Provider</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={formData.name}
                            onChange={handleInputChange}
                            isInvalid={!!errors.name}
                        />
                        {errors.name && <Alert variant="danger">{errors.name}</Alert>}
                    </Form.Group>

                    <Form.Group controlId="formBasicCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Select
                            name="country"
                            aria-label="Select Country"
                            value={formData.country}
                            onChange={handleInputChange}
                            isInvalid={!!errors.country}
                        >
                            <option value="">Select Country</option>
                            {countries.map((item, i) => (
                                <option key={i} value={item}>
                                    {item}
                                </option>
                            ))}
                        </Form.Select>
                        {errors.country && <Alert variant="danger">{errors.country}</Alert>}
                    </Form.Group>

                    <Form.Group controlId="formBasicMarketShare">
                        <Form.Label>Market share</Form.Label>
                        <Form.Control
                            type="number"
                            name="market_share"
                            placeholder="Enter market share"
                            value={formData.market_share}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicRenewableEnergyPercentage">
                        <Form.Label>Renewable energy percentage</Form.Label>
                        <Form.Control
                            type="number"
                            name="renewable_energy_percentage"
                            placeholder="Enter renewable energy percentage"
                            value={formData.renewable_energy_percentage}
                            onChange={handleInputChange}
                            isInvalid={!!errors.renewable_energy_percentage}
                        />
                        {errors.renewable_energy_percentage && <Alert variant="danger">{errors.renewable_energy_percentage}</Alert>}
                    </Form.Group>   

                    <Form.Group controlId="formBasicYearlyRevenue">
                        <Form.Label>Yearly revenue</Form.Label>
                        <Form.Control
                            type="number"
                            name="yearly_revenue"
                            placeholder="Enter yearly revenue"
                            value={formData.yearly_revenue}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Button variant="dark" type="submit" className="w-100">
                        Post Provider
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default UpdateProvider;
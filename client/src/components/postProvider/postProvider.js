import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./postProvider.css";
import { countries } from "../resources/countries";

const PostProvider = () => {
    const [formData, setFormData] = useState({
        name: "",
        country: "",
        market_share: 0,
        renewable_energy_percentage: 0,
        yearly_revenue: 0
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.renewable_energy_percentage < 0 || formData.renewable_energy_percentage > 100) {
            alert("Renewable energy percentage must be between 0 and 100.");
            return;
        }

        console.log("Form Data Submitted: ", formData); // Debug: log the form data being submitted

        try {
            const response = await fetch("http://localhost:5000/api/provider", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to post provider');
            }

            const data = await response.json(); // Correct method to parse JSON response
            console.log(data);
            navigate("/"); 
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="center-form">
            <h1>Post New Provider</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Select
                        name="country"
                        aria-label="Select Country"
                        value={formData.country}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Country</option>
                        {countries.map((item, i) => (
                            <option key={i} value={item}>
                                {item}
                            </option>
                        ))}
                    </Form.Select>
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
                    />
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
    );
};

export default PostProvider;

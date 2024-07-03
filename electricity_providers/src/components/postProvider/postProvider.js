import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from"react-router-dom";
import "./postProvider.css";

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
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        if (formData.renewable_energy_percentage < 0 || formData.renewable_energy_percentage > 100) {
            alert("Renewable energy percentage must be between 0 and 100.");
            return;
        }
        
        e.preventDefault();
        try {
            const response = fetch("http://localhost:5000/api/provider", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });
            const data = await response.stringify(formData);
            console.log(data);
            navigate("/"); 
        } catch (error) {
            console.error(error.message);
        }
    }
    
    return (
        <>
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
                        <Form.Control
                            type="text"
                            name="country"
                            placeholder="Enter country"
                            value={formData.country}
                            onChange={handleInputChange}
                        />
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
        </>
    )
};

export default PostProvider;
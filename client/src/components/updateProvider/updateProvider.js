import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import { useEffect } from "react";
import "./updateProvider.css";

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

    useEffect(() => {
        const fetchProvider  = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/provider/${id}`);
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error("error while fetching provides:", error.message);
            }
        }
        fetchProvider();
    }, [id]);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/provider/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });
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
                        Update Provider
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default UpdateProvider;
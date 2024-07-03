import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Table, Row, Container, Button } from "react-bootstrap";

const Dashboard = () => {
    const [providers, setProviders] = useState([]);
    const navigate = useNavigate();

    const fetchProviders  = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/provider");
            const data = await response.json();
            setProviders(data);
        } catch (error) {
            console.error("error while fetching provides:", error.message);
        }
    }

    useEffect(() => {
        fetchProviders();
    }, []);

    const handleUpdate = (providerId) => {
        navigate(`/provider/${providerId}`);
    }

    const handleDelete = async (providerId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/provider/${providerId}`, {
                method:"DELETE"
            });
            console.log(response);
            if(response.ok){
                fetchProviders();
            }
        } catch (error) {
            console.error("Error while deleting provides:", error.message);
        }
    }

    return (
        <>
            <Container className="mt-5">
                <Row>
                    <h1 className="text-center">Dashboard Component</h1>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Country</th>
                                <th>Market share</th>
                                <th>Renewable energy percentage</th>
                                <th>Yearly revenue</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {providers.map((provider) => (
                                <tr key={provider._id}>
                                    <td>{provider.name}</td>
                                    <td>{provider.country}</td>
                                    <td>{provider.market_share}</td>
                                    <td>{provider.renewable_energy_percentage}</td>
                                    <td>{provider.yearly_revenue}</td>
                                    <td>
                                        <Button variant="dark" onClick={() => handleUpdate(provider._id)}>
                                            Update
                                        </Button>{" "}
                                        <Button variant="danger" onClick={() => handleDelete(provider._id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </>
    )
}

export default Dashboard;
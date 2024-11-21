import React, { useState, useEffect } from 'react';
import PropertyCard from '../PropertyCard';
import './PropertyListing.scss';

const PropertyListing = () => {
    const [ properties, setProperties ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        const fetchProperties = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('http://localhost:3000/api/properties');
            if (!response.ok) {
                throw new Error(`Status: ${response.status}`);
            }
            const properties = await response.json();
            setProperties(properties);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    fetchProperties();
    }, []);

    if (error) {
        return <p>There was an error: {error.message}, try again later.</p>;
    }

    if (loading) {
        return <p>Loading properties...</p>;
    }

    return (
        !!properties ? (
            <ul className="PropertyListing">
                {properties.map((property, index) => (
                    <li key={index}>
                        <PropertyCard {...property} />
                    </li>
                ))}
            </ul>
        ) : (
            <p>No properties found</p>
        )
    );
};

export default PropertyListing;
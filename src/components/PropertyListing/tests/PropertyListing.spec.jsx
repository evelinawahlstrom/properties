import React from 'react';
import { render, screen } from '@testing-library/react';
import { within } from '@testing-library/dom';
import PropertyListing from '../PropertyListing';

describe('PropertyListing', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve([
                        { id: 1, propertyTitle: '1 bedroom flat for sale', bedrooms: 1 },
                        { id: 2, propertyTitle: '2 bedroom flat for sale', bedrooms: 2 },
                        { id: 3, propertyTitle: '3 bedroom flat for sale', bedrooms: 3 },
                        { id: 4, propertyTitle: '4 bedroom flat for sal4', bedrooms: 4 },
                        { id: 5, propertyTitle: '5 bedroom flat for sale', bedrooms: 5 },
                    ]),
            })
        );
    });

    afterEach(() => {
        global.fetch.mockClear();
        delete global.fetch;
    });

    it('should render five property cards', async () => {
        render(<PropertyListing />);
        const propertiesList = await screen.findByRole('list');
        const propertyCards = within(propertiesList).getAllByRole('listitem');
        expect(propertyCards).toHaveLength(5);
    });
});
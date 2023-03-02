import React from 'react';
import { render } from '@testing-library/react'

import App from 'next/dist/pages/_app';

test('renders learn react link', () => {
    const component = render(<App />, {
        wrapper: ({ children }) => {children}
    })
    expect(component.baseElement).toBeInTheDocument()
})
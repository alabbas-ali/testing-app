import React from 'react';
import { render } from '@testing-library/react'
import App from '../home'
import { Provider } from 'react-redux'
import { store } from '../store'

test('renders learn react link', () => {
    const component = render(<App />, {
        wrapper: ({ children }) => {children}
    })
    expect(component.baseElement).toBeInTheDocument()
})
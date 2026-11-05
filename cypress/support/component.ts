/* eslint-disable @typescript-eslint/no-namespace */
// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

import '@cypress/code-coverage/support';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Import styles
import '../../src/index.css';

import { createElement } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { mount } from 'cypress/react18';
import NBTheme from '../../src/theme';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

// Mount inside the app theme so components render with the same palette as in the app
Cypress.Commands.add('mount', (component, options) =>
  mount(createElement(ThemeProvider, { theme: NBTheme }, component), options)
);

// Example use:
// cy.mount(<MyComponent />)

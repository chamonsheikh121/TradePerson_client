// src/config/roles.js
export const ROLES = {
    CUSTOMER: 'customer',
    TRADESPERSON: 'tradesperson',
    ADMIN: 'admin'
  };
  
  export const ROLE_HIERARCHIES = {
    [ROLES.CUSTOMER]: ['customer'],
    [ROLES.TRADESPERSON]: ['tradesperson'],
    [ROLES.ADMIN]: ['admin', 'tradesperson', 'customer']
  };
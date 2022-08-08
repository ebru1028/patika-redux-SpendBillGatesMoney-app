import React from 'react';

import { Container } from 'reactstrap';

const Layout = ({ children }) => {
    return (
        <Container fluid>
            <main>{children}</main>
        </Container>
    )
}

export default Layout;
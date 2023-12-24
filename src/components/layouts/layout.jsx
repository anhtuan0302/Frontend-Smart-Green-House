import React from "react";
import styled from "styled-components";
import Footer from "./footer";

const Layout = ({ title, body }) => {
    return (
        <Wrapper>
            <BodyWrapper className="container py-3 px-3">
                <h2>{title}</h2>
                {body}
            </BodyWrapper>

            <FooterWrapper>
                <Footer />
            </FooterWrapper>
        </Wrapper>
    );
};

export default Layout;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const BodyWrapper = styled.div`
    flex: 1; /* Chia tỷ lệ flex 1 để nó chiếm phần còn lại của trang */
    color: #252525;
    h2 {
        font-size: 25px;
        font-weight: 600;
        margin-bottom: 25px;
    }
`;

const FooterWrapper = styled.div`
    background: #FFFFFF;
    padding-top: 1rem;
    position: fixed;
    bottom: 0;
    width: 100%;
    border-radius: 10px 10px 0px 0px;
`;

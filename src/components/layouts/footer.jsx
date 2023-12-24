import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Col, Row } from "antd";
import { HomeOutlined, AppstoreOutlined, CarryOutOutlined, UserOutlined } from "@ant-design/icons";

const Footer = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const activeStyle = { color: "#207ef8", textDecoration: "none" };

    return (
        <Row gutter={16}>
            <Col className={`gutter-row text-center ${isActive("/") ? "active" : ""}`} span={6}>
                <Link to="/" style={isActive("/") ? { ...styleIcon, ...activeStyle } : styleIcon}>
                    <HomeOutlined />
                    <p style={isActive("/") ? { ...styleText, ...activeStyle } : styleText}>Home</p>
                </Link>
            </Col>
            <Col className={`gutter-row text-center ${isActive("/devices") ? "active" : ""}`} span={6}>
                <Link to="/devices" style={isActive("/devices") ? { ...styleIcon, ...activeStyle } : styleIcon}>
                    <AppstoreOutlined />
                    <p style={isActive("/devices") ? { ...styleText, ...activeStyle } : styleText}>Devices</p>
                </Link>
            </Col>
            <Col className={`gutter-row text-center ${isActive("/records") ? "active" : ""}`} span={6}>
                <Link to="/records" style={isActive("/records") ? { ...styleIcon, ...activeStyle } : styleIcon}>
                    <CarryOutOutlined />
                    <p style={isActive("/records") ? { ...styleText, ...activeStyle } : styleText}>Records</p>
                </Link>
            </Col>
            <Col className={`gutter-row text-center ${isActive("/me/*") ? "active" : ""}`} span={6}>
                <Link to="/me" style={isActive("/me/*") ? { ...styleIcon, ...activeStyle } : styleIcon}>
                    <UserOutlined />
                    <p style={isActive("/me/*") ? { ...styleText, ...activeStyle } : styleText}>Me</p>
                </Link>
            </Col>
        </Row>
    );
};

const styleText = { color: "#7f7f7f", fontSize: "13px", textDecoration: "none" };
const styleIcon = { fontSize: "21px", color: "#7f7f7f", textDecoration: "none" };

export default Footer;

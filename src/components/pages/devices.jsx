import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../layouts/layout';
import styled from 'styled-components';

import { Col, Row, Switch, InputNumber } from 'antd';

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import firebaseConfig from '../../firebaseConfig';

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

const Devices = () => {
    const [ledStatus, setLedStatus] = useState(false);
    const [doorStatus, setDoorStatus] = useState(false);
    const [roofStatus, setRoofStatus] = useState(false);
    const [fanStatus, setFanStatus] = useState(false);
    const [pumpStatus, setPumpStatus] = useState(false);
    const [fanHours, setFanHours] = useState(-1);
    const [fanMinutes, setFanMinutes] = useState(-1);

    useEffect(() => {
        const dataOutputs = ref(database, 'Outputs');
        onValue(dataOutputs, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const ledValue = data.Led;
                const doorValue = data.Door;
                const roofValue = data.Roof;
                const fanValue = data.Fan;
                const pumpValue = data.Pump;
                const fanHoursValue = data.FanHours;
                const fanMinutesValue = data.FanMinutes;

                setLedStatus(ledValue);
                setDoorStatus(doorValue);
                setRoofStatus(roofValue);
                setFanStatus(fanValue);
                setPumpStatus(pumpValue);
                setFanHours(fanHoursValue || -1);
                setFanMinutes(fanMinutesValue || -1);
            }
        });
    }, []);

    const toggleLed = () => {
        const ledRef = ref(database, 'Outputs/Led');
        set(ledRef, !ledStatus);
    };

    const toggleDoor = () => {
        const doorRef = ref(database, 'Outputs/Door');
        set(doorRef, !doorStatus);
    };

    const toggleRoof = () => {
        const roofRef = ref(database, 'Outputs/Roof');
        set(roofRef, !roofStatus);
    };

    const toggleFan = () => {
        const fanRef = ref(database, 'Outputs/Fan');
        set(fanRef, !fanStatus);
    };

    const togglePump = () => {
        const pumpRef = ref(database, 'Outputs/Pump');
        set(pumpRef, !pumpStatus);
    };

    const toggleFanHours = (value) => {
        const fanHoursRef = ref(database, 'Outputs/FanHours');
        set(fanHoursRef, value || -1);
        setFanHours(value || -1);
    };

    const toggleFanMinutes = (value) => {
        const fanMinutesRef = ref(database, 'Outputs/FanMinutes');
        set(fanMinutesRef, value || -1);
        setFanMinutes(value || -1);
    };


    const pageTitle = 'Devices';
    const pageBody = (
        <div>
            <Grid>
                <Row>
                    <Col span={18}>
                        <h3>Led</h3>
                    </Col>
                    <Col span={6}>
                        <Switch
                            checkedChildren="ON"
                            unCheckedChildren="OFF"
                            checked={ledStatus}
                            onChange={toggleLed}
                        />
                    </Col>
                </Row>
            </Grid>
            <Grid>
                <Row>
                    <Col span={18}>
                        <h3>Door</h3>
                    </Col>
                    <Col span={6}>
                        <Switch
                            checkedChildren="ON"
                            unCheckedChildren="OFF"
                            checked={doorStatus}
                            onChange={toggleDoor}
                        />
                    </Col>
                </Row>
            </Grid>
            <Grid>
                <Row>
                    <Col span={18}>
                        <h3>Roof</h3>
                    </Col>
                    <Col span={6}>
                        <Switch
                            checkedChildren="ON"
                            unCheckedChildren="OFF"
                            checked={roofStatus}
                            onChange={toggleRoof}
                        />
                    </Col>
                </Row>
            </Grid>
            <Grid>
                <Row>
                    <Col span={6}>
                        <h3>Fan</h3>
                    </Col>
                    <Col span={12}>
                        <InputNumber min={0} max={23} onChange={toggleFanHours} style={{ width: '50px' }} placeholder="HH" value={fanHours === -1 ? undefined : fanHours}/>
                        <span> : </span>
                        <InputNumber min={0} max={59} onChange={toggleFanMinutes} style={{ width: '50px' }} placeholder="mm" value={fanMinutes === -1 ? undefined : fanMinutes}/>
                    </Col>
                    <Col span={6}>
                        <Switch
                            checkedChildren="ON"
                            unCheckedChildren="OFF"
                            checked={fanStatus}
                            onChange={toggleFan}
                        />
                    </Col>
                </Row>
            </Grid>
            <Grid>
                <Row>
                    <Col span={18}>
                        <h3>Pump</h3>
                    </Col>
                    <Col span={6}>
                        <Switch
                            checkedChildren="ON"
                            unCheckedChildren="OFF"
                            checked={pumpStatus}
                            onChange={togglePump}
                        />
                    </Col>
                </Row>
            </Grid>

        </div>
    );

    return (
        <div>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>
            <Layout title={pageTitle} body={pageBody} />
        </div>
    );
};

export default Devices;

const Grid = styled.div`
    padding: 25px 0px 20px 20px;
    margin: 0px 0px 15px 0px;
    background: #FFFFFF;
    border-radius: 8px;
    h3 {
        font-size: 17px;
        font-weight: 500;
    }
`;
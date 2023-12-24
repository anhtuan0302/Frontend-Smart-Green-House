import React, { useState, useEffect } from "react";
import Layout from "../layouts/layout";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { LineChart } from "@mui/x-charts";
import moment from "moment";

import { Progress, Row, Col, Switch } from "antd";

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import firebaseConfig from '../../firebaseConfig';

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

const Home = () => {
  const [latestTemp, setLatestTemp] = useState();
  const [latestHumid, setLatestHumid] = useState();
  const [tempData, setTempData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [flameData, setFlameData] = useState([]);
  const [lightData, setLightData] = useState([]);
  const [rainData, setRainData] = useState([]);
  const [soilData, setSoilData] = useState([]);
  const [xLabels, setXLabels] = useState([]);

  const sendTwilioSMS = async () => {
    const url = 'https://api.twilio.com/2010-04-01/Accounts/AC54c2273f606d503fb508b32b84c316d3/Messages.json';
    const username = 'AC54c2273f606d503fb508b32b84c316d3';
    const password = 'a4fa7aa25fa7b0c1c3b074f0742c2a58';
    const to = '+84327391929';
    const from = '+12058833304';
    const body = 'FIRE WARNING';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          To: to,
          From: from,
          Body: body,
        }),
        credentials: 'include',
        mode: 'cors',
        headers: new Headers({
          'Authorization': 'Basic ' + btoa(username + ':' + password),
        }),
      });

      if (response.ok) {
        console.log('SMS Sent Successfully');
      } else {
        console.error('Failed to send SMS:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  };
  
  useEffect(() => {
    const dataDHT11 = ref(database, 'Inputs/DHT11');
    onValue(dataDHT11, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const sortedData = Object.entries(data).map(([epochTime, item]) => {
          return { ...item, epochTime: parseInt(epochTime, 10) };
        }).sort((a, b) => a.epochTime - b.epochTime);

        const latestData = sortedData[sortedData.length - 1];
        setLatestTemp(latestData.Temp);
        setLatestHumid(latestData.Humidity);

        const tempData = sortedData.map((item) => item.Temp);
        setTempData(tempData);

        const humidityData = sortedData.map((item) => item.Humidity);
        setHumidityData(humidityData);

        const xLabels = sortedData.map((item) => moment(item.epochTime * 1000).format('DD/MM'));
        setXLabels(xLabels);
      }

      const dataInputs = ref(database, 'Inputs');
      onValue(dataInputs, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const soilValue = data.Soil;
          const rainValue = data.Rain;
          const flameValue = data.Flame;
          if (flameValue) {
            sendTwilioSMS();
          }
          const lightValue = data.Light;
          setSoilData(soilValue);
          setRainData(rainValue);
          setFlameData(flameValue);
          setLightData(lightValue);
        }
      });
    });
  }, []);
  const twoColors = { '0%': '#108ee9', '100%': '#87d068' };
  const conicColors = { '0%': '#87d068', '50%': '#ffe58f', '100%': '#ffccc7' };
  const pageTitle = "Home";
  const pageBody = (
    <div>
      {/* <Grid>
        <iframe src='https://6816197e96b247d3af8465694fb9c6c9.elf.site' width='100%' height='100px' frameborder='0'></iframe>
      </Grid> */}
      <Row gutter={[10, 0]}>
        <Col span={12}>
          <Grid >
            <h3>Temperature</h3>
            <Progress type="dashboard" percent={latestTemp} strokeColor={conicColors} format={() => `${Math.round(latestTemp)}°C`} />
          </Grid>
        </Col>
        <Col span={12}>
          <Grid>
            <h3>Humidity</h3>
            <Progress type="dashboard" percent={latestHumid} strokeColor={twoColors} format={() => `${Math.round(latestHumid)}%`} />
          </Grid>
        </Col>
      </Row>
      <Row gutter={[10, 0]}>
        <Col span={12}>
          <Grid>
            <h3>Soil</h3>
            <Progress type="dashboard" percent={soilData} strokeColor={conicColors} format={() => `${Math.round(soilData)}`} />
          </Grid>
        </Col>
        <Col span={12}>
          <Grid>
            <Row>
              <Col span={12}>
                <h3>Rain</h3>
              </Col>
              <Col span={12}>
                <Switch checkedChildren="Yes" unCheckedChildren="No" checked={rainData} />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <h3>Flame</h3>
              </Col>
              <Col span={12}>
                <Switch checkedChildren="Yes" unCheckedChildren="No" checked={flameData} />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <h3>Light</h3>
              </Col>
              <Col span={12}>
                <Switch checkedChildren="Yes" unCheckedChildren="No" checked={lightData} />
              </Col>
            </Row>
          </Grid>
        </Col>
      </Row>
      <Grid>
        <h4>Temp & Humidity Chart</h4>
        <LineChart
          width={330}
          height={300}
          series={[
            { data: tempData, label: 'Temp', color: '#FF7F50' },
            { data: humidityData, label: 'Humidity', color: '#87CEFA' },
          ]}
          xAxis={[{ scaleType: 'point', data: xLabels }]}
        />
      </Grid>
    </div>
  );

  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Layout title={pageTitle} body={pageBody} />
    </div>
  );
};

export default Home;

const Grid = styled.div`
    padding: 15px 0px 15px 15px;
    margin: 0px 0px 15px 0px;
    background: #FFFFFF;
    border-radius: 8px;
    h3 {
        font-size: 17px;
        font-weight: 500;
        padding-bottom: 5px;
    }
    h4 {
        font-size: 17px;
        font-weight: 500;
        text-align: center;
    }
`;

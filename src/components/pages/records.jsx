import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../layouts/layout';
import styled from 'styled-components';
import { Timeline } from 'antd';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import firebaseConfig from '../../firebaseConfig';

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

const Records = () => {
  const [history, setHistory] = useState([]);
  const [state, setState] = useState(false);

  useEffect(() => {
    const led1HistoryRef = ref(database, 'outputs/led1/history');
    const led1StateRef = ref(database, 'outputs/led1/state');

    onValue(led1HistoryRef, (snapshot) => {
      const historyData = snapshot.val();
    
      console.log('History Data:', historyData);
    
      if (historyData) {
        // Chuyển đổi số nguyên thành đối tượng
        const formattedHistory = [
          {
            date: new Date(historyData * 1000).toLocaleString(),
            state: state ? 'Bật đèn' : 'Tắt đèn',
          },
          ...history, // Thêm bản ghi mới vào đầu mảng
        ];
    
        console.log('Formatted History:', formattedHistory);
        const sortedHistory = formattedHistory.sort((a, b) =>
          new Date(b.date) - new Date(a.date)
        ); // Sắp xếp mảng theo thời gian giảm dần
        setHistory(sortedHistory);
      }
    });

    onValue(led1StateRef, (snapshot) => {
      const stateData = snapshot.val();
      console.log('State Data:', stateData);
      setState(stateData || false);
    });
  }, []);

  const pageTitle = 'Records';
  const pageBody = (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Thời Gian</th>
            <th>Trạng Thái</th>
          </tr>
        </thead>
        <tbody>
          {history.map((record, index) => (
            <tr key={index}>
              <td>{record.date}</td>
              <td>{record.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default Records;


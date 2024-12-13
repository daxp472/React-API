import React, { useEffect, useState } from 'react';

const Bank = () => {
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    fetch('https://api.kaustubhk24.in/indian-banks-api')
      .then((response) => response.json())
      .then((data) => setBanks(data || []));
  }, []);

  return (
    <div>
      <h2>Indian Banks</h2>
      <ul>
        {banks.map((bank) => (
          <li key={bank.ifsc}>{bank.bank_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Bank;

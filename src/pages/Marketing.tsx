import React from "react";
import Button from "../components/design-system/Button";
import { healthApi } from "../api/health/health-api";

const MarketingPage: React.FC = () => {
  const handleTest1 = async () => {
    try {
      const response = await fetch('http://localhost:8080/health', {
        method: 'GET',
        credentials: 'include',

      });
      console.log('Test 1 Response:', response);

    } catch (error) {
      console.error('Test 1 Error:', error);
    }
  };

  const handleTest2 = async () => {
    const response = await healthApi.ok();
    console.log('Test 2 Response:', response);

  };

  return (
    <div>
      <h1>Marketing Page</h1>
      <Button onClick={handleTest1}>Click me</Button>
      <Button onClick={handleTest2}>Click me 2</Button>
    </div>
  );
}

export default MarketingPage;
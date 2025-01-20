import React from "react";
import Button from "../components/design-system/Button";
import { healthApi } from "../api/health/health-api";

const MarketingPage: React.FC = () => {
  const handleTest1 = async () => {
    try {
      const response = await healthApi.ok();
      console.log('Test 1 Response:', response.message);
    } catch (error) {
      console.error('Test 1 Error:', error);
    }
  };

  const handleTest2 = async () => {
    const response = await healthApi.okAuthenticated();
    console.log('Test 2 Response:', response.message);
  };

  return (
    <div>
      <h1>Marketing Page</h1>
      <Button onClick={handleTest1}>Health</Button>
      <Button onClick={handleTest2}>Health Auth</Button>
    </div>
  );
}

export default MarketingPage;
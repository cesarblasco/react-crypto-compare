import React from "react";
import AppContextProvider from "./contexts/AppContext";
import CryptoCompareWrapper from "./components/CryptoCompareWrapper";

const App: React.FC<any> = () => {

  return (
    <AppContextProvider>
      <CryptoCompareWrapper />
    </AppContextProvider>
  );
};

export default App;

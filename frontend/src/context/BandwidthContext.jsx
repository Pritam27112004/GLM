import React, { createContext, useContext, useState, useEffect } from 'react';

const BandwidthContext = createContext();

export const BandwidthProvider = ({ children }) => {
  const [bandwidthMode, setBandwidthMode] = useState(() => {
    try {
      return localStorage.getItem('ncct_bandwidth_mode') || 'standard';
    } catch (e) {
      return 'standard';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ncct_bandwidth_mode', bandwidthMode);
    } catch (e) {}
  }, [bandwidthMode]);

  return (
    <BandwidthContext.Provider
      value={{
        bandwidthMode,
        setBandwidthMode,
        isDataSaver: bandwidthMode === 'data-saver',
        isOfflineAvailable: bandwidthMode === 'offline'
      }}
    >
      {children}
    </BandwidthContext.Provider>
  );
};

export const useBandwidth = () => useContext(BandwidthContext);

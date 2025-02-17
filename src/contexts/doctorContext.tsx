import React, { PropsWithChildren, useEffect, useState } from "react";
import { IDoctor, IDoctorContext } from '../inferfaces';

const DoctorContext = React.createContext({} as IDoctorContext);

function DoctorProvider(props: PropsWithChildren) {
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(import.meta.env.VITE_API_URL).then(res => res.json()).then((doctors) => {
      setDoctors(doctors);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <DoctorContext.Provider
      value={{
        doctors,
        loading,
      }}
      {...props}
    />
  );
}

function useDoctor() {
  const context = React.useContext(DoctorContext);

  if (context === undefined) {
    throw new Error('useDoctor must be used within a DoctorProvider');
  }
  return context;
}

export { DoctorProvider, useDoctor };

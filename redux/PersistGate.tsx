"use client";

import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../redux/store";

function PersistGates({ children }: { children: React.ReactNode }) {
  return (
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  );
}

export default PersistGates;

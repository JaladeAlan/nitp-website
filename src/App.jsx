import React from "react";
import { ToastContainer } from "react-toastify";
import AppRouter from "./router";

export default function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

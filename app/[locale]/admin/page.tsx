import { AdminPageClient } from "../components";
import React from "react";

const AdminPage = () => {
  return (
    <div className="mo:max-w-[480px] sm:w-[480px] md:w-[768px] lg:w-[1280px] mx-auto p-5 mt-[120px]">
      <AdminPageClient />
    </div>
  );
};

export default AdminPage;

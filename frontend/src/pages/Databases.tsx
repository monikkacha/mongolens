import { useState } from "react";
import { listDatabases } from "../services/apis/mongo";

const Databases = () => {
  const [dbs, setDbs] = useState([]);

  const load = async () => {
    const res = await listDatabases(import.meta.env.VITE_MONGO_CON);
    setDbs(res.data.databases);
  };

  return (
    <div className="p-4">
      <button onClick={load} className="bg-blue-500 text-white p-2 rounded">
        Load Databases
      </button>

      <pre className="bg-gray-100 p-3 mt-4">{JSON.stringify(dbs, null, 2)}</pre>
    </div>
  );
};

export default Databases;

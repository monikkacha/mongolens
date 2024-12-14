import React, { useState, useEffect } from "react";
import {
  connectToMongoDB,
  getDatabases,
  getCollections,
  getDocuments,
  queryCollections,
} from "./api/mongoService";
import {
  HiDatabase,
  HiCollection,
  HiDocumentText,
  HiSearch,
  HiCheckCircle,
  HiXCircle,
  HiClipboardList,
  HiHome,
  HiCog,
  HiTrash,
} from "react-icons/hi"; // Icons from react-icons

const App: React.FC = () => {
  const [mongoUri, setMongoUri] = useState<string>("mongodb://localhost:27017");
  const [databases, setDatabases] = useState<string[]>([]);
  const [collections, setCollections] = useState<string[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [dbName, setDbName] = useState<string>("");
  const [collectionName, setCollectionName] = useState<string>("");
  const [filterJson, setFilterJson] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [statusType, setStatusType] = useState<"success" | "error" | null>(
    null
  );
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true); // Sidebar toggle state

  // Auto-hide toast after 4 seconds
  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  const handleConnect = async () => {
    if (!mongoUri) {
      setStatusMessage("Please enter a valid Mongo URI.");
      setStatusType("error");
      return;
    }
    setIsConnecting(true);
    setStatusMessage("");
    setLoading(true);
    try {
      const message = await connectToMongoDB(mongoUri);
      setStatusMessage(message);
      setStatusType("success");
      fetchDatabases();
    } catch (error: any) {
      setStatusMessage(`Error: ${error.message}`);
      setStatusType("error");
    } finally {
      setIsConnecting(false);
    }
  };

  const fetchDatabases = async () => {
    try {
      const dbs = await getDatabases();
      setDatabases(dbs);
    } catch (error: any) {
      setStatusMessage(`Error fetching databases: ${error.message}`);
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  };

  const fetchCollections = async () => {
    if (!dbName) return;
    setLoading(true);
    try {
      const cols = await getCollections(dbName);
      setCollections(cols);
    } catch (error: any) {
      setStatusMessage(`Error fetching collections: ${error.message}`);
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  };

  const fetchDocuments = async () => {
    if (!dbName || !collectionName) return;
    setLoading(true);
    try {
      const docs = await getDocuments(dbName, collectionName);
      setDocuments(docs);
    } catch (error: any) {
      setStatusMessage(`Error fetching documents: ${error.message}`);
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleQuery = async () => {
    if (!dbName || !collectionName || !filterJson) return;
    setLoading(true);
    try {
      const results = await queryCollections(
        dbName,
        collectionName,
        filterJson
      );
      setDocuments(results);
    } catch (error: any) {
      setStatusMessage(`Error executing query: ${error.message}`);
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  };

  // Fetch collections when dbName changes
  useEffect(() => {
    if (dbName) {
      fetchCollections();
    }
  }, [dbName]);

  // Fetch documents when collectionName changes
  useEffect(() => {
    if (collectionName) {
      fetchDocuments();
    }
  }, [collectionName]);

  return (
    <div className="app w-full h-full flex bg-[#181818] text-[#F4F4F4]">
      {/* Toast Message in Bottom Right */}
      {statusMessage && (
        <div
          className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
            statusType === "success" ? "bg-[#00B500]" : "bg-[#FF3B30]"
          } text-white flex items-center gap-3`}
          style={{ width: "auto", maxWidth: "400px" }}
        >
          {statusType === "error" ? (
            <HiXCircle className="text-2xl" />
          ) : (
            <HiCheckCircle className="text-2xl" />
          )}
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Full-Screen Loader */}
      {loading && (
        <div className="fixed inset-0 bg-[#00000060] flex items-center justify-center z-50">
          <div className="text-white text-3xl">
            <div className="animate-spin rounded-full border-t-4 border-b-4 border-[#0077B6] w-16 h-16 mx-auto"></div>
            <p className="mt-4">Loading...</p>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`sidebar w-64 bg-[#222222] p-6 transition-all fixed h-full shadow-lg transform ${
          isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full sm:translate-x-0 w-16"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <h1
            className={`text-3xl font-semibold text-white transition-all ${
              isSidebarOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            MongoDB Viewer
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-[#0077B6] text-2xl sm:hidden"
          >
            {isSidebarOpen ? "←" : "→"}
          </button>
        </div>
        <div className="flex flex-col space-y-6">
          <div
            className="cursor-pointer hover:bg-[#333333] p-3 rounded-md flex items-center gap-4 transition-all"
            onClick={() => {
              setDbName("");
              setCollectionName("");
              fetchDatabases();
            }}
          >
            <HiHome className="text-[#0077B6] text-xl" />
            <span
              className={`${
                isSidebarOpen ? "block" : "hidden"
              } text-white text-lg`}
            >
              Home
            </span>
          </div>

          {/* Divider between Databases and Collections */}
          {databases.length > 0 && (
            <div className="space-y-2 border-b border-[#444444] pb-4">
              {databases.map((db) => (
                <div
                  key={db}
                  onClick={() => {
                    setDbName(db);
                    setCollectionName(""); // Reset collection when changing database
                  }}
                  className="cursor-pointer hover:bg-[#333333] p-3 rounded-md flex items-center gap-4 transition-all"
                >
                  <HiDatabase className="text-[#0077B6] text-xl" />
                  <span
                    className={`${
                      isSidebarOpen ? "block" : "hidden"
                    } text-white text-lg`}
                  >
                    {db}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Divider between Collections and Documents */}
          {dbName && collections.length > 0 && (
            <div className="space-y-2 mt-4 border-b border-[#444444] pb-4">
              {collections.map((col) => (
                <div
                  key={col}
                  onClick={() => setCollectionName(col)}
                  className="cursor-pointer hover:bg-[#333333] p-3 rounded-md flex items-center gap-4 transition-all"
                >
                  <HiCollection className="text-[#0077B6] text-xl" />
                  <span
                    className={`${
                      isSidebarOpen ? "block" : "hidden"
                    } text-white text-lg`}
                  >
                    {col}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="content flex-grow p-8 ml-64 transition-all">
        <div className="header flex justify-between items-center mb-8">
          <h1 className="text-4xl text-white font-semibold tracking-tight">
            MongoDB Viewer
          </h1>
          <div className="connection flex gap-4 items-center">
            <input
              type="text"
              value={mongoUri}
              onChange={(e) => setMongoUri(e.target.value)}
              placeholder="mongodb://localhost:27017"
              className="p-3 w-80 rounded-lg bg-[#333333] text-white placeholder-[#B5B5B5] border border-[#444444] focus:ring-2 focus:ring-[#0077B6] transition duration-300"
              disabled={isConnecting}
            />
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className={`p-3 bg-[#0077B6] text-white rounded-lg border border-[#0077B6] transition duration-300 hover:bg-[#005b80] focus:ring-2 focus:ring-[#0077B6] ${
                isConnecting ? "cursor-wait" : ""
              }`}
            >
              {isConnecting ? "Connecting..." : "Connect"}
            </button>
          </div>
        </div>

        {/* Databases, Collections, Documents */}
        <div className="databases mb-8">
          {databases.length === 0 && loading && (
            <div className="text-center text-[#B5B5B5]">
              <HiClipboardList className="inline-block mr-2 text-lg text-white" />
              Loading Databases...
            </div>
          )}
        </div>

        {/* Documents Section */}
        <div className="documents mb-8">
          {collectionName && documents.length > 0 ? (
            <>
              <h3 className="text-xl font-semibold text-[#E0E0E0] mb-4">
                Documents in {collectionName}
              </h3>
              <div className="document-list space-y-4">
                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className="document-card bg-[#222222] p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <pre className="text-sm text-white whitespace-pre-wrap break-words">
                      {JSON.stringify(doc, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            </>
          ) : loading ? (
            <div className="text-center text-[#B5B5B5]">
              <HiClipboardList className="inline-block mr-2 text-lg text-white" />
              Loading Documents...
            </div>
          ) : (
            <div className="text-center text-[#B5B5B5]">No Documents</div>
          )}
        </div>

        {/* Query Section */}
        <div className="query-container mt-8">
          <h3 className="text-xl font-semibold text-[#0077B6] mb-4">
            Query Documents
          </h3>
          <textarea
            value={filterJson}
            onChange={(e) => setFilterJson(e.target.value)}
            placeholder="Enter filter JSON"
            className="w-full h-40 p-4 rounded-lg bg-[#333333] text-white border border-[#444444] focus:ring-2 focus:ring-[#0077B6] mb-4 transition duration-300"
          />
          <button
            onClick={handleQuery}
            className="w-full p-3 bg-[#0077B6] text-white rounded-lg border border-[#0077B6] hover:bg-[#005b80] transition-all duration-300"
          >
            <HiSearch className="inline-block mr-2 text-lg" />
            Run Query
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;

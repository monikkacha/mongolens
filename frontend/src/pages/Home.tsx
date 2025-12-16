import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { testConnection } from "@/services/apis/connection";

interface SavedConnection {
  id: string;
  name: string;
  connectionString: string;
}

const HomePage: React.FC = () => {
  const [connectionString, setConnectionString] = useState("");
  const [loading, setLoading] = useState(false);
  const [savedConnections, setSavedConnections] = useState<SavedConnection[]>([
    {
      id: "1",
      name: "Local MongoDB",
      connectionString: "mongodb://localhost:27017",
    },
  ]);

  const navigate = useNavigate();

  const handleConnect = async () => {
    setLoading(true);
    try {
      const res = await testConnection(connectionString);

      if (res.data.success) {
        navigate("/connections", {
          state: {
            connectionString,
          },
        });
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Connection failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setSavedConnections((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-[#0b0f17] to-[#0c1a24] text-white p-6 relative overflow-hidden">
      {/* Floating Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-green-700/20 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-56 h-56 rounded-full bg-cyan-600/10 blur-3xl" />
      </div>

      {/* Saved Connections Button */}
      <div className="absolute right-6 top-6 z-20">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="text-neutral-300 hover:bg-neutral-800/60 backdrop-blur-sm border border-neutral-700/40"
            >
              <Star className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-neutral-900/90 border border-neutral-700 backdrop-blur-xl text-white">
            <DialogHeader>
              <DialogTitle>Saved Connections</DialogTitle>
            </DialogHeader>

            <ScrollArea className="max-h-80 pr-4">
              {savedConnections.length === 0 && (
                <p className="text-sm text-neutral-400">
                  No saved connections.
                </p>
              )}

              <div className="space-y-3 mt-3">
                {savedConnections.map((conn) => (
                  <Card
                    key={conn.id}
                    className="bg-neutral-800/70 border border-neutral-700 hover:bg-neutral-700/50 transition-all"
                  >
                    <CardHeader>
                      <CardTitle className="text-sm text-white tracking-wide">
                        {conn.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-neutral-400 break-all">
                        {conn.connectionString}
                      </p>
                      <div className="flex gap-3 mt-3">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-neutral-700 text-white hover:bg-neutral-600"
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(conn.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>

      {/* Center Content */}
      <div className="flex flex-1 items-center justify-center p-6 relative z-10">
        <Card className="w-full max-w-md bg-neutral-900/80 border border-neutral-700 backdrop-blur-xl text-white shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center tracking-wide drop-shadow">
              Connect to MongoDB
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                placeholder="mongodb://localhost:27017"
                value={connectionString}
                onChange={(e) => setConnectionString(e.target.value)}
                className="bg-neutral-800/70 border-neutral-700 text-white placeholder-neutral-500 backdrop-blur-sm"
              />

              <Button
                className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white shadow-lg transition-all"
                onClick={handleConnect}
                disabled={loading || !connectionString}
              >
                {loading ? "Connecting..." : "Connect"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;

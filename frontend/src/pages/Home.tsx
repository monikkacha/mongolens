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
import Lock from "../assets/lock.png";

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
        navigate("/connections", { state: { connectionString } });
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
    <div className="relative min-h-screen bg-gradient-to-br from-black via-[#0b0f17] to-[#0c1a24] text-white overflow-hidden">
      {/* ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 left-16 w-48 h-48 rounded-full bg-green-700/20 blur-3xl" />
        <div className="absolute bottom-24 right-24 w-72 h-72 rounded-full bg-cyan-600/10 blur-3xl" />
      </div>

      {/* saved connections */}
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
              <div className="space-y-3 mt-3">
                {savedConnections.map((conn) => (
                  <Card
                    key={conn.id}
                    className="bg-neutral-800/70 border border-neutral-700 hover:bg-neutral-700/50 transition"
                  >
                    <CardHeader>
                      <CardTitle className="text-sm">{conn.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-neutral-400 break-all">
                        {conn.connectionString}
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="secondary">Edit</Button>
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

      {/* main split layout */}
      <div className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* LEFT – content */}
        <div className="flex items-center justify-center px-6">
          <Card className="w-full max-w-md bg-neutral-900/80 border border-neutral-700 backdrop-blur-xl shadow-2xl">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold tracking-wide">
                MongoDB Connection
              </CardTitle>
              <p className="text-sm text-neutral-400 mt-1">
                Connect, test, and manage your database sessions
              </p>
            </CardHeader>
            <CardContent className="space-y-5">
              <Input
                placeholder="mongodb://localhost:27017"
                value={connectionString}
                onChange={(e) => setConnectionString(e.target.value)}
                className="bg-neutral-800/70 border-neutral-700 text-white"
              />
              <Button
                className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 shadow-lg"
                onClick={handleConnect}
                disabled={loading || !connectionString}
              >
                {loading ? "Connecting..." : "Connect"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT – 3D / image showcase */}
        <div className="hidden lg:flex items-center justify-center relative">
          <div className="relative ">
            {/* placeholder for your 3D isometric image or canvas */}
            <img
              src={Lock} // replace with your 3D image path
              alt="3D MongoDB"
              className="h-[800px] w-[800px] animate-pulse"
            />
            <div className="absolute -inset-6 rounded-full bg-emerald-500/10 blur-3xl" />
          </div>
        </div>
      </div>

      {/* floating animation */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
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
import Database from "../assets/Mydatabase.png";
import Logo from "../assets/logo.png";

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
    <div className="relative min-h-screen bg-gradient-to-br from-[#1F2933] via-[#364156] to-[#1F2933] text-white overflow-hidden">

      {/* ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 left-16 w-52 h-52 rounded-full bg-[#7FC8F8]/20 blur-3xl" />
        <div className="absolute bottom-24 right-24 w-72 h-72 rounded-full bg-[#4A5D73]/20 blur-3xl" />
      </div>

      {/* saved connections */}
      <div className="absolute right-20 top-20 z-20">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="
              bg-[#1C2541]
            text-[#95a2ba]
            hover:text-white
            hover:bg-[#2C3646]/70
            backdrop-blur-md
            border-[#b6c2d9]
            shadow-md
            rounded-full
          "
            >
              <Star className="h-6 w-6" />
            </Button>
          </DialogTrigger>

          <DialogContent className="
        bg-[#2C3646]/95
        border border-[#4A5D73]
        backdrop-blur-xl
        text-white
        shadow-2xl
        rounded-2xl
      ">
            <DialogHeader>
              <DialogTitle className="text-lg tracking-wide">
                Saved Connections
              </DialogTitle>
            </DialogHeader>

            <ScrollArea className="max-h-80 pr-4">
              <div className="space-y-4 mt-4">
                {savedConnections.map((conn) => (
                  <Card
                    key={conn.id}
                    className="
                  bg-[#364156]/80
                  border border-[#4A5D73]
                  hover:bg-[#364156]
                  transition-all
                  rounded-xl
                  shadow-md
                "
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-white">
                        {conn.name}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <p className="text-xs text-[#B6C2D9] break-all">
                        {conn.connectionString}
                      </p>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="
                        bg-[#4A5D73]
                        hover:bg-[#2498e6]
                        text-white
                        hover:text-[#1F2933]
                        transition
                      "
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          onClick={() => handleDelete(conn.id)}
                          className="
                        bg-[#E5533D]/90
                        hover:bg-[#e72b0e]
                        text-white
                        transition
                      "
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
      <div className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-2 bg-[#1C2541]">
        {/* LEFT – content */}
        <div className="flex items-center justify-center px-6">
          <Card className="w-full max-w-lg bg-[#232F5A]/90 border border-[#3A4A7A] backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] rounded-2xl">

            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-semibold tracking-wide text-white">
                MongoDB Connection
              </CardTitle>
              <p className="text-sm text-[#B8C1EC]">
                Connect, test, and manage your database sessions
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <Input
                placeholder="mongodb://localhost:27017"
                value={connectionString}
                onChange={(e) => setConnectionString(e.target.value)}
                className="
            bg-[#2E3A6E] 
            border border-[#3A4A7A] 
            text-white 
            placeholder:text-[#B8C1EC]
            focus:border-[#5BC0BE]
            focus:ring-[#5BC0BE]
          "
              />

              <Button
                onClick={handleConnect}
                disabled={loading || !connectionString}
                className="
            w-full 
            bg-gradient-to-from-[#5BC0BE] to-[#3A86FF]
            hover:from-[#6FFFE9] hover:to-[#5BC0BE]
            text-[#1C2541]
            font-semibold
            shadow-lg
            transition-all duration-300
          "
              >
                {loading ? "Connecting..." : "Connect"}
              </Button>
            </CardContent>
          </Card>
        </div>


        {/* RIGHT – 3D / image showcase */}
        {/* RIGHT SIDE WRAPPER – creates space from screen */}
        <div className="hidden lg:flex items-center justify-center min-h-screen p-12 bg-[#1C2541]">

          {/* RIGHT PANEL – your blue design */}
          <div className="relative flex items-center justify-center w-full h-full bg-[#3A506B] rounded-[48px] overflow-hidden">
            <img src={Logo}
              className="absolute top-20 w-[90px] h-[90px]" />
            <p className="absolute top-50 left-1/2 -translate-x-1/2 tracking-wide text-[#ffffff] text-4xl font-semibold">
              Welcome to mongolens
            </p>
            <img
              src={Database}
              alt="Illustration"
              className="mt-40 w-[75%] max-w-[700px] h-auto object-contain"
            />

          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
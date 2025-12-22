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
import Logo from "@/assets/logo.png";


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
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 left-16 w-52 h-52 rounded-full bg-[#7FC8F8]/20 blur-3xl" />
        <div className="absolute bottom-24 right-24 w-72 h-72 rounded-full bg-[#4A5D73]/20 blur-3xl" />
      </div> */}

      {/* saved connections */}
      <div className="absolute right-6 top-10 z-20">
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
      <div className="relative z-10 min-h-screen grid-cols-1 lg:grid-cols-2 bg-[#080e0e]">
        <div className="flex items-center justify-center px-6">
          <Card className=" absolute space-y-6 top-70 w-full max-w-lg bg-[#080e0e]/90 border border-red-700 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] rounded-2xl">

            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-semibold tracking-wide text-white">
                <img src={Logo} className="w-[90px] h-[90px] top-282 left-623 rounded-full mx-auto" />
              </CardTitle>
              <p className="text-[24px] text-center letter-space-0 h-100% text-[#F6F6F6] font-Roboto ">
                A new way to browse MongoDB data
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
                className="bg-[#61BAB9] bg-hover:none font-Roboto text-[#ffffff] size-18px rounded-[4px] w-[160px] h-[60px] top-535px left-867px font-medium">
                {loading ? "Connecting..." : "Connect"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* <footer className="px-8 py-28 flex text-center justify-center">
        <div className="mt-6 text-sm font-normal text-red-500 bg-amber-100">
          <p>Hi welcome to mongolenss</p>
        </div>
      </footer> */}
    </div>
  );
};

export default HomePage;
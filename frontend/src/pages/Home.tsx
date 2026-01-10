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
import { FaGithub } from "react-icons/fa";

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
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message || "Connection failed");
      } else {
        alert("Connection failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setSavedConnections((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="relative min-h-screen items-center bg-[#080e0e] text-white overflow-hidden flex flex-col">
      <div className="absolute right-6 top-10 z-20">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="bg-[#1C2541] text-[#95a2ba] hover:text-white hover:bg-[#2C3646]/70 backdrop-blur-md border-[#b6c2d9] shadow-md rounded-full"
            >
              <Star className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#2C3646]/95 border border-[#4A5D73] backdrop-blur-xl text-white shadow-2xl rounded-2xl">
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
                    className="bg-[#364156]/80 border border-[#4A5D73] hover:bg-[#364156] transition-all rounded-xl shadow-md"
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
                          className=" bg-[#4A5D73] hover:bg-[#2498e6] text-white hover:text-[#1F2933] transition"
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          onClick={() => handleDelete(conn.id)}
                          className="bg-[#E5533D]/90 hover:bg-[#e72b0e] text-white transition"
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

      {/* <div className="min-h-screen bg-[#080e0e]"> */}
      <div className="flex flex-1 items-center justify-center px-4">
        <Card className="w-ful max-w-3xl space-y-20 bg-[#080e0e] border-0 ">
          <CardHeader className="space-y-4 text-center">
            <CardTitle className="text-3xl font-semibold tracking-wide text-white">
              <img
                src={Logo}
                className="w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full mx-auto"
              />
            </CardTitle>
            <p className="text-[15px] sm:text-[20px] lg:text-[24px] text-center md:text-center lg-text-center mt-3 text-[#F6F6F6] font-light font-roboto">
              A new way to browse MongoDB data
            </p>
          </CardHeader>

          <CardContent className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 ">
            <Input
              placeholder="mongodb://localhost:27017 "
              value={connectionString}
              onChange={(e) => setConnectionString(e.target.value)}
              className="w-[200px] h-[60px] md:w-[400px] md:h-[60px] lg:w-[600px] lg:h-[60px] bg-[#1B1E1F] font-roboto rounded-sm pl-6 text-white border-0 font-light placeholder:text-white placeholder:font-light placeholder:text-[20px] placeholder:lg:text-[24px] placeholder:md:text-[21px]"
            />

            <Button
              onClick={handleConnect}
              disabled={loading || !connectionString}
              className="bg-[#61BAB9] hover:bg-[#61BAB9] font-roboto font-medium text-[#ffffff] rounded-sm text-[18px] w-[200px] h-[60px] md:w-[400px] md:h-[60px] lg:w-[160px] lg:h-[60px] lg:gap-4 "
            >
              {loading ? "Connecting..." : "Connect"}
            </Button>
          </CardContent>
        </Card>

        <footer>
          <div className="fixed bottom-2 left-0 w-full flex justify-center items-center font-roboto text-[#f6f6f6] text-[14px] md:text-[16px] lg:text-[18px] font-light letter-space-0 h-100%">
            <p className="flex flex-col lg:flex-row items-center gap-2 p-0 text-center lg:text-center">
              Any suggestion in mind ! or found a error,shoot us at
              <a href="https://github.com/monikkacha/mongolens">
                <FaGithub className="w-[20px] h-[19px] " />
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
    // </div>
  );
};

export default HomePage;

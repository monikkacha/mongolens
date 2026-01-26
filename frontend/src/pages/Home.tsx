import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
    <div className="relative min-h-screen items-center bg-[#080e0e] overflow-hidden flex flex-col">
      <div className="absolute left-10 top-15 z-20">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="h-11 w-11 rounded-full bg-[#0f1a1a] text-[#9fb3b3]
                   hover:bg-[#162424] hover:text-white
                   border border-[#1f2d2d] shadow-md"
            >
              <Star className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-96 bg-[#1C2541] border-l border-[#4A5D73] backdrop-blur-xl text-gray-50 text-2xl rounded-2xl"
          >
            <SheetHeader className="pt-2 pb-6 px-6">
              <SheetTitle className="text-3xl tracking-wide text-white pt-20 font-roboto">
                Saved Connections
              </SheetTitle>
            </SheetHeader>

            <ScrollArea className="flex-1 px-6">
              <div className="space-y-4">
                {savedConnections.map((conn) => (
                  <div
                    key={conn.id}
                    className="rounded-2xl bg-[#0f1a1a]/60   font-medium border border-[#1f2d2d] p-10"
                  >
                    <div className="text-xl text-white font-medium font-roboto mb-1">
                      {conn.name}
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs text-white break-all font-roboto">
                        {conn.connectionString}
                      </p>

                      <div className="fixed gap-2 justify-center bottom-10 left-5 right-5 flex flex-col border-t border-gray-500 pt-4">
                        <Button
                          size="sm"
                          className="bg-blue-500 hover:bg-[#2498e6] h-10 text-white hover:text-[#1F2933] transition"
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          onClick={() => handleDelete(conn.id)}
                          className="bg-red-500 hover:bg-[#e72b0e] h-10 text-white transition font-roboto"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

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

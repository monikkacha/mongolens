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

  const handleConnect = async () => {
    setLoading(true);
    try {
      console.log("Connecting to:", connectionString);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setSavedConnections((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground p-6 relative">
      {/* Saved Connections Button */}
      <div className="absolute right-6 top-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost">
              <Star className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Saved Connections</DialogTitle>
            </DialogHeader>

            <ScrollArea className="max-h-80 pr-4">
              {savedConnections.length === 0 && (
                <p className="text-sm opacity-70">No saved connections.</p>
              )}

              <div className="space-y-3 mt-3">
                {savedConnections.map((conn) => (
                  <Card key={conn.id}>
                    <CardHeader>
                      <CardTitle className="text-sm">{conn.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs opacity-70 break-all">
                        {conn.connectionString}
                      </p>
                      <div className="flex gap-3 mt-3">
                        <Button size="sm" variant="secondary">
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
      <div className="flex flex-1 items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">
              Connect to MongoDB
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                placeholder="mongodb://localhost:27017"
                value={connectionString}
                onChange={(e) => setConnectionString(e.target.value)}
              />

              <Button
                className="w-full"
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

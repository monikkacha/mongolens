import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import ConnectionCard from "@/components/connection/ConnectionCard";
import ConnectionForm from "@/components/connection/ConnectionForm";

export interface Connection {
  id: string;
  name: string;
  connectionString: string;
}

const ConnectionsDashboard = () => {
  const [connections, setConnections] = useState<Connection[]>([
    {
      id: "1",
      name: "Local MongoDB",
      connectionString: "mongodb://localhost:27017",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editingConnection, setEditingConnection] = useState<Connection | null>(
    null
  );

  const handleAdd = (data: Connection) => {
    setConnections((prev) => [...prev, data]);
    setOpen(false);
  };

  const handleUpdate = (updated: Connection) => {
    setConnections((prev) =>
      prev.map((conn) => (conn.id === updated.id ? updated : conn))
    );
    setOpen(false);
  };

  const handleDelete = (id: string) => {
    setConnections((prev) => prev.filter((conn) => conn.id !== id));
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Connections Dashboard</h1>

        {/* Add Connection Button */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Connection</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingConnection ? "Edit Connection" : "New Connection"}
              </DialogTitle>
            </DialogHeader>

            <ConnectionForm
              initialData={editingConnection}
              onSubmit={editingConnection ? handleUpdate : handleAdd}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Separator className="mb-6" />

      {/* List of Connections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {connections.map((conn) => (
          <ConnectionCard
            key={conn.id}
            connection={conn}
            onEdit={() => {
              setEditingConnection(conn);
              setOpen(true);
            }}
            onDelete={() => handleDelete(conn.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ConnectionsDashboard;

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { type Connection } from "@/pages/ConnectionsDashboard";

interface Props {
  initialData?: Connection | null;
  onSubmit: (data: Connection) => void;
}

const ConnectionForm = ({ initialData, onSubmit }: Props) => {
  const [name, setName] = useState(initialData?.name || "");
  const [connectionString, setConnectionString] = useState(
    initialData?.connectionString || ""
  );

  const handleSubmit = () => {
    const payload: Connection = {
      id: initialData?.id ?? Date.now().toString(),
      name,
      connectionString,
    };

    onSubmit(payload);
  };

  return (
    <div className="space-y-4 mt-2">
      <div>
        <Label>Name</Label>
        <Input
          placeholder="My MongoDB Server"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <Label>Connection String</Label>
        <Input
          placeholder="mongodb://localhost:27017"
          value={connectionString}
          onChange={(e) => setConnectionString(e.target.value)}
        />
      </div>

      <Button className="w-full mt-2" onClick={handleSubmit}>
        Save Connection
      </Button>
    </div>
  );
};

export default ConnectionForm;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Connection } from "@/pages/ConnectionsDashboard";

interface Props {
  connection: Connection;
  onEdit: () => void;
  onDelete: () => void;
}

const ConnectionCard = ({ connection, onEdit, onDelete }: Props) => {
  return (
    <Card className="border border-neutral-700">
      <CardHeader>
        <CardTitle className="text-lg">{connection.name}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm opacity-75 break-all">
          {connection.connectionString}
        </p>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={onEdit}>
            Edit
          </Button>

          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectionCard;

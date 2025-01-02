import { Input } from "@/components/ui/input";
import CompanyIcon from "./../assets/png/project_icon.png";
import { Button } from "@/components/ui/button";

const Connection = () => {
  const placeHolderConnectionString = "mongodb://localhost:27017";
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <img src={CompanyIcon} className="h-20 w-20 rounded-full" />
        <p className="text-white mt-4">A new way to browse MongoDB data </p>
        <div className="flex w-full items-center space-x-2 mt-12">
          <Input
            className="bg-[#1B1E1F] text-white outline-none border-none rounded-[4px] min-w-[400px] placeholder:text-white/30"
            type="email"
            placeholder={placeHolderConnectionString}
          />
          <Button type="submit" variant={"default"}>
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Connection;

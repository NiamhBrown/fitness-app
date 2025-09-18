import { Button } from "../ui/button";

export const AddLogButton = () => {
  const handleAddLog = () => {
    console.log("BUTTON CLICKED :)");
  };
  return <Button onClick={handleAddLog}>Click me</Button>;
};

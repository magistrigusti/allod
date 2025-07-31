import { useState, ChangeEventHandler } from 'react';
import { Button, Input } from 'antd';
import "./HouseLabel.css";

type PropsType = {
  isMount: boolean;
  onSave: () => void;
  onChangeName: (name: string) => void;
}

export const HouseLabel = ({ isMount: defaultMount, onSave, onChangeName, defaultName }: PropsType) => {
  const [isMount, setIsMount] = useState(defaultMount);

  const handleSaveHouse = () => {
    setIsMount(true);
    onSave();
  };

  const handleChangeName = (e: ChangeEventHandler<HTMLInputElement>) => {}

  return (
    <div className="house-label">
      <Input placeholder="address" 
        defaultValue={defaultName}
        onChange={handleChangeName} 
        disabled={isMount}
      />

      <Button disabled={isMount} onPointerDown={handleSaveHouse}>
        Save
      </Button>
    </div>
  )
}
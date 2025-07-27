import { Button } from 'antd';
import { House } from '../House';
import "./HouseLabel.css";

type PropsType = {
  house: House;
}

export const HouseLabel = ({ house }: PropsType) => {

  const handleSaveHouse = () => {
    house.saveHouse();
  }

  return (
    <div>
      House Label
      <Button onPointerDown={handleSaveHouse}>Save</Button>
    </div>
  )
}
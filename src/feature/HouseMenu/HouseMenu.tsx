import { Button } from 'antd';
import { MainFlowScene } from '@/scene/MainFlowScene';

type TypeProps ={
  scene: { mountDraftHouseOnScene: (title: string) => void };
}

export const HouseMenu = ({ scene }: TypeProps) => {
  const handleClick = (title: string) => {
    scene.mountDraftHouseOnScene(title);
  };

  return (
    <ul className="house-menu">
      <Button onClick={() => handleClick('castle')}>Замок</Button>
      <Button onClick={() => handleClick('pizzashop')}>Таверна</Button>
      <Button onClick={() => handleClick('shack')}>Дом</Button>
      <Button onClick={() => handleClick('woodhouse')}>Лесопилка</Button>
    </ul>
  )
}
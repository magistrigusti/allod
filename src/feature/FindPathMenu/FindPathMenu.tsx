import { useState } from 'react';
import { Card, Input, Flex, Button, Alert, Form } from 'antd';
import { Graph, Node as HouseNode } from '@/shared/Graph';
import { getIdsOfPathNodes } from './util/getIdsOfPathNodes';
import { createPathMapFromPathMatrix } from './util/createPathMapFromPathMatrix';
import { PathTree } from './ui/PathTree';
import { House } from '@/shared/House';
import cn from 'classnames';
import './FindPathMenu.css';

type PropsType = {
  housesPathGraph: Graph;
  db: IndexDB;
}

export const FindPathMenu = ({ housesPathGraph, db }: PropsType) => {
  const [pathsMap, setPathsMap] = useState<Map<string, HouseNode[]>>(new Map());
  const [findError, setFindError] = useState('');

  const handleSearchPath = async (values: { from: string; to: string }) => {
    if (!housesPathGrapth) return;

    const allHousesInfo = await db.getAllHousesInfo();

    const { nodeFromId, nodeToId } = getIdsOfPathNodes(values.from, values.to, allHousesInfo);
    
    const nodeFrom = housesPathGraph.map.get(nodeFromId);
    const nodeTo = housesPathGraph.map.get(nodeToId);

    const hasNodes = nodeTo && nodeFrom;

    if (!hasNodes) {
      setFindError('page not fiund');
      return;
    }

    const possiblePathMatrix = housesPathGraph.getAllPaths(nodeFrom, nodeTo);
    const pathsMap = createPathMapFromPathMatrix(possiblePathMatrix);

    setPathsMap(pathsMap);
    setFindError(possiblePathMatrix.length === 0 ? 'Маршрут не найден' : '');
  };

  return (
    <Card rootClassName="findpath-container" title="fuind line">
      <Form onFinish={handleSearchPath}>
        <Flex gap="middle" vertical>
          <Form.Item name="from" 
            style={{ marginBottom: 0 }}
            rules={[{ required: true, message: "Fill"}]}
          >
            <Input placeholder="from" />
          </Form.Item>

          <Form.Item name="to" 
            style={{marginBottom: 0}}
            rules={[{ required: true, message: "Fill"}]}
          >
            <Input placeholder="from" />
          </Form.Item>

          <button htmlType="submit" type="primary">
            fuind
          </button>
        </Flex>
      </Form>
    </Card>
  )
}
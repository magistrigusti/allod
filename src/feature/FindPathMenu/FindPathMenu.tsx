import "./FindPathMenu";
import { Card, Input, Flex, Button, Alert, Form } from 'antd';
import { Graph } from "@/shared/Graph";
import { getIdsOfPathNodes } from "./util/getIdsOfPathNodes";

type PropsType = {
  housesPathGraph: Graph;
  db: IndexDB;
}

export const FindPathMenu = ({ housesPathGraph, db }: PropsType) => {
  const handleSearchPath = async (values: { from: string; to: string }) => {
    const allHousesInfo = await db.getAllHousesInfo();

    const { nodeFromId, nodeToId } = getIdsOfPathNodes(values.from, values.to, allHousesInfo);
    
    const nodeFrom = housesPathGraph.map.get(nodeFromId);
    const nodeTo = housesPathGraph.map.get(nodeToId);

    const hasNodes = nodeTo && nodeFrom;

    if (!hasNodes) {
      return;
    }

    const possiblePathMatrix = housesPathGraph.getAllPaths(nodeFrom, nodeTo);
  };

  return (
    <Card rootClassName="findpath-container" title="fuind line">
      <Form>
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
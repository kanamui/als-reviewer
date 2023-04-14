import React from "react";
import { Center, Heading } from "native-base";
import Layout from "../components/Layout";

const Module: React.FC = ({ navigation, route }: any) => {
  return (
    <Layout>
      <Center flex="1">
        <Heading>Module</Heading>
      </Center>
    </Layout>
  );
};

export default Module;

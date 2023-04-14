import React from "react";
import { Center, Heading } from "native-base";
import Layout from "../components/Layout";

const Quiz: React.FC = ({ navigation, route }: any) => {
  return (
    <Layout>
      <Center flex="1">
        <Heading>Quiz</Heading>
      </Center>
    </Layout>
  );
};

export default Quiz;

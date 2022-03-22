import Sample from "components/sample/sample";
import { GetStaticProps, NextPage } from "next";
import { NasaPicture } from "services/sample.types";
import { SampleApi } from "services/sampleSvc";

export const getStaticProps: GetStaticProps = async () => {
  const api = new SampleApi();
  const viewCnt: number = 10;
  const sample = await api.getNasaPicture(viewCnt);
  return {
    props: {
      sample,
    },
  };
};

const SamplePage = ({ sample }) => {
  console.log(sample);
  return (
    <div>
      <Sample />
    </div>
  );
};

export default SamplePage;

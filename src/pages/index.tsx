import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import Header from "../components/Header";
import Main from "./components/Main";

function Home({ data }: any) {
  return <Main data={data} />;
}
export async function getStaticProps() {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return {
    props: { data },
  };
}
export default Home;

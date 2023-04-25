import axios from "axios";
import Main from "../components/Main";

function Home({ data }: any) {
  return <Main data={data} />;
}
export async function getStaticProps() {
  try {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    return {
      props: { data },
      revalidate: 60,
    };
  } catch (err) {
    console.error(err);
    return {
      notFound: true,
    };
  }
}
export default Home;

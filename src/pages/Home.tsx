import Container from "@/components/ui/container";
import { FC } from "react";
import { useQuery } from "react-query";
import axios from "../api";
import Loading from "@/components/customComponents/Loading.tsx";
import Error from "@/components/customComponents/Error.tsx";
import { IItem } from "@/types";
import ItemsGrid from "@/components/customComponents/ItemsGrid.tsx";
import { ITEMS_LINK } from "@/constants/links.ts";

const fetchItems = async (): Promise<IItem[]> => {
  const { data } = await axios.get(ITEMS_LINK);
  return data;
};

const Home: FC = () => {
  const { data, error, isLoading } = useQuery<IItem[], Error>(
    "items",
    fetchItems,
  );

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <Container className="flex items-center justify-center">
      <div className="w-[90%] my-20">
        <h5 className="font-bold mb-4">Products Page</h5>
        {data && <ItemsGrid items={data} />}
      </div>
    </Container>
  );
};

export default Home;

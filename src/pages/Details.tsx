import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import axios from "../api";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import Edit from "@/assets/icons/edit";
import { useState } from "react";
import EditItermForm from "@/components/customComponents/EditItemForm.tsx";
import Loading from "@/components/customComponents/Loading.tsx";
import ProductDetailsItem from "@/components/customComponents/ItemDetailsCard.tsx";

const fetchProductById = async (productId: string | undefined) => {
  if (!productId) return;
  const { data } = await axios.get(`items/${productId}`);
  return data;
};

export default function Details() {
  const { id } = useParams();
  const { isAuthenticated } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
  }));
  const [showEditSection, setShowEditSection] = useState(false);
  const { data, isLoading } = useQuery(["product", id], () =>
    fetchProductById(id),
  );

  if (isLoading) return <Loading />;

  const handleEditBtn = () => {
    setShowEditSection(true);
  };

  return (
    <Container className="flex justify-center py-12 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h6 className="font-bold mb-10">Products Details</h6>
        {isAuthenticated && !showEditSection && (
          <div className="flex justify-end w-full my-2 ">
            <Button variant={"ghost"} onClick={handleEditBtn}>
              <Edit />
            </Button>
          </div>
        )}
        {showEditSection ? (
          <EditItermForm
            data={data}
            closeForm={() => setShowEditSection(false)}
          />
        ) : (
          <ProductDetailsItem data={data} />
        )}
      </div>
    </Container>
  );
}

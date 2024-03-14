import { FC } from "react";
import { IItem } from "@/types";
import { Card } from "@/components/ui/card.tsx";
import { IMAGE_PLACEHOLDER } from "@/constants";
import { Button } from "@/components/ui/button.tsx";

interface ProductDetailsItemProps {
  data: IItem;
}

const ProductDetailsItem: FC<ProductDetailsItemProps> = ({ data }) => {
  return (
    <Card className="grid grid-cols-1 md:grid-cols-2 items-center">
      <img
        alt={data.itemName}
        src={data.itemImage || IMAGE_PLACEHOLDER}
        className="rounded-lg shadow-md w-full h-[35rem] object-contain"
      />
      <div className="flex flex-col p-10 h-full">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">{data.itemName}</h2>
          <p className="mb-4">{data.itemDescription}</p>
          <p className="font-semibold mb-6">{data.itemPrice}$</p>
        </div>
        <Button className="rounded-full py-8">CTA</Button>
      </div>
    </Card>
  );
};
export default ProductDetailsItem;

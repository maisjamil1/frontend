import { FC } from "react";
import { IItem } from "@/types";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card.tsx";
import { IMAGE_PLACEHOLDER } from "@/constants";
import { Button } from "@/components/ui/button.tsx";

const ItemsGrid: FC<{ items: IItem[] }> = ({ items }) => (
  <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
    {items.map((item) => (
      <Link
        to={`/details/${item.id}`}
        key={item.id}
        className="bg-white shadow rounded-xl overflow-hidden"
      >
        <Card>
          <img
            alt={item.itemName}
            src={item.itemImage || IMAGE_PLACEHOLDER}
            className="w-full"
            style={{ aspectRatio: "200/200", objectFit: "cover" }}
          />
          <div className="flex flex-col p-4">
            <p className="text-center text-lg font-semibold">{item.itemName}</p>
            <Button className="mt-4 py-5 rounded-full">{item.itemPrice}</Button>
          </div>
        </Card>
      </Link>
    ))}
  </div>
);
export default ItemsGrid;

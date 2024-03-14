import { useReducer, FC, FormEvent } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuthStore from "@/store/authStore";

interface FormState {
  id?: number;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  itemImage: string;
}

type FormAction =
  | { type: "set_itemName"; payload: string }
  | { type: "set_itemDescription"; payload: string }
  | { type: "set_itemPrice"; payload: string }
  | { type: "set_itemImage"; payload: string };

const reducer = (state: FormState, action: FormAction): FormState => ({
  ...state,
  [action.type.replace("set_", "")]:
    action.type === "set_itemPrice" ? +action.payload : action.payload,
});
interface EditItemFormProps {
  closeForm: () => void;
  data: FormState;
}
const EditItermForm: FC<EditItemFormProps> = ({
  closeForm,
  data: initialState,
}) => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { handleAuthenticatedRequest } = useAuthStore((state) => state);

  const [state, dispatch] = useReducer(reducer, initialState);

  const updateProductById = async () => {
    await handleAuthenticatedRequest({
      url: `/items/${id}`,
      body: state,
      method: "PATCH",
    });
    queryClient.invalidateQueries(["product", id]);
    closeForm();
  };

  const { mutate } = useMutation(updateProductById, {
    onSuccess: () => {
      console.log("Product updated successfully");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate();
  };

  const handleInputChange =
    (type: FormAction["type"]) => (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type, payload: e.target.value });
    };

  return (
    <Card className="items-center">
      <form
        className="w-[50rem] p-8 flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className="text-center font-semibold">Edit Product</div>
        <Input
          placeholder="Product Name"
          value={state.itemName}
          onChange={handleInputChange("set_itemName")}
        />
        <Input
          placeholder="Product Description"
          value={state.itemDescription}
          onChange={handleInputChange("set_itemDescription")}
        />
        <Input
          placeholder="Product Price"
          value={state.itemPrice.toString()}
          onChange={handleInputChange("set_itemPrice")}
        />
        <Button type="submit" className="py-6">
          Save
        </Button>
        <Button onClick={closeForm} className="py-6">
          Cancel
        </Button>
      </form>
    </Card>
  );
};

export default EditItermForm;

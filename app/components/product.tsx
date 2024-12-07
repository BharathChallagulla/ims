import {
  Paper,
  Typography,
  Box,
  Grid2 as Grid,
  Input,
  Button,
} from "@mui/material";

import { ProductProps } from "@/types";
import { EmptyProduct, ProductDetails } from "@/constant";
import { useEffect, useState } from "react";

const Product: React.FC<{ prod: ProductProps; editDetails: boolean }> = ({
  prod,
  editDetails,
}) => {
  const [createProduct, setCreateProduct] = useState<ProductProps>(prod);
  const [edit, setEdit] = useState(editDetails);

  const handleChange = (key: keyof ProductProps, value: string | number) => {
    setCreateProduct({
      ...createProduct,
      [key]: value,
    });
  };

  const handleSave = () => {
    console.log(createProduct);

    setEdit(false);
  };

  const handleEdit = () => {
    setEdit(true);
  };
  return (
    <>
      <Typography variant="h6" id="modal-modal-title" gutterBottom>
        {edit ? "Create/Edit Product Details" : "Product Details"}
      </Typography>

      <Box>
        <Grid container spacing={2}>
          {ProductDetails.map((d) => {
            return (
              <Grid
                size={d.key == "name" || d.key == "description" ? 12 : 6}
                key={d.key + d.title}
              >
                <Typography
                  fontSize={"0.8rem"}
                  color="rgb(55 65 81)"
                  fontWeight={600}
                >
                  {d.title}:
                </Typography>
                {edit ? (
                  <Input
                    key={d.key}
                    type={d.type}
                    value={createProduct[d.key]}
                    className="h-5 p-1 text-xs"
                    onChange={(e) =>
                      handleChange(
                        d.key,
                        d.type === "number"
                          ? Number(e.target.value)
                          : e.target.value
                      )
                    }
                  />
                ) : (
                  <Typography fontSize={"0.75rem"}>
                    {prod ? prod[d.key] : ""}
                  </Typography>
                )}
              </Grid>
            );
          })}
          <Grid size={6}>
            {edit ? (
              <Button
                variant="contained"
                size="small"
                className="bg-gray-900 hover:bg-gray-700"
                onClick={handleSave}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="contained"
                size="small"
                className="bg-gray-900 hover:bg-gray-700"
                onClick={handleEdit}
              >
                Edit
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Product;

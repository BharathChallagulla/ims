import { Paper, Typography, Box, Grid2 as Grid } from "@mui/material";

import { ProductProps } from "@/types";

const Product: React.FC<{ prod: ProductProps | null }> = ({ prod }) => {
  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Product Details
      </Typography>
      <Box>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography
              fontSize={"0.8rem"}
              color="rgb(55 65 81)"
              fontWeight={600}
            >
              Name:
            </Typography>
            <Typography fontSize={"0.75rem"}>{prod?.name}</Typography>
          </Grid>
          <Grid size={6}>
            <Typography
              fontSize={"0.8rem"}
              color="rgb(55 65 81)"
              fontWeight={600}
            >
              Category:
            </Typography>
            <Typography fontSize={"0.75rem"}>{prod?.category}</Typography>
          </Grid>
          <Grid size={6}>
            <Typography
              fontSize={"0.8rem"}
              color="rgb(55 65 81)"
              fontWeight={600}
            >
              Supplier:
            </Typography>
            <Typography fontSize={"0.75rem"}>{prod?.supplier}</Typography>
          </Grid>
          <Grid size={6}>
            <Typography
              fontSize={"0.8rem"}
              color="rgb(55 65 81)"
              fontWeight={600}
            >
              Price:
            </Typography>
            <Typography fontSize={"0.75rem"}>
              ${prod?.price.toFixed(2)}
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography
              fontSize={"0.8rem"}
              color="rgb(55 65 81)"
              fontWeight={600}
            >
              Cost Price:
            </Typography>
            <Typography fontSize={"0.75rem"}>
              ${prod?.costPrice.toFixed(2)}
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography
              fontSize={"0.8rem"}
              color="rgb(55 65 81)"
              fontWeight={600}
            >
              MSRP:
            </Typography>
            <Typography fontSize={"0.75rem"}>
              ${prod?.msrp.toFixed(2)}
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography
              fontSize={"0.8rem"}
              color="rgb(55 65 81)"
              fontWeight={600}
            >
              Discount:
            </Typography>
            <Typography fontSize={"0.75rem"}>{prod?.discount}%</Typography>
          </Grid>
          <Grid size={6}>
            <Typography
              fontSize={"0.8rem"}
              color="rgb(55 65 81)"
              fontWeight={600}
            >
              Tax Rate:
            </Typography>
            <Typography fontSize={"0.75rem"}>{prod?.taxRate}%</Typography>
          </Grid>
          <Grid size={6}>
            <Typography
              fontSize={"0.8rem"}
              color="rgb(55 65 81)"
              fontWeight={600}
            >
              Quantity:
            </Typography>
            <Typography fontSize={"0.75rem"}>{prod?.quantity}</Typography>
          </Grid>
          <Grid size={6}>
            <Typography
              fontSize={"0.8rem"}
              color="rgb(55 65 81)"
              fontWeight={600}
            >
              Shipping Weight:
            </Typography>
            <Typography fontSize={"0.75rem"}>
              {prod?.shippingWeight} lbs
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography
              fontSize={"0.8rem"}
              color="rgb(55 65 81)"
              fontWeight={600}
            >
              Shipping Dimensions:
            </Typography>
            <Typography fontSize={"0.75rem"}>
              {prod?.shippingDimensions}
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography
              fontSize={"0.8rem"}
              color="rgb(55 65 81)"
              fontWeight={600}
            >
              Shipping Carrier:
            </Typography>
            <Typography fontSize={"0.75rem"}>
              {prod?.shippingCarrier}
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography
              fontSize={"0.8rem"}
              color="rgb(55 65 81)"
              fontWeight={600}
            >
              Shipping Cost:
            </Typography>
            <Typography fontSize={"0.75rem"}>
              ${prod?.shippingCost.toFixed(2)}
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography
              fontSize={"0.8rem"}
              color="rgb(55 65 81)"
              fontWeight={600}
            >
              Description:
            </Typography>
            <Typography fontSize={"0.75rem"}>{prod?.description}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Product;

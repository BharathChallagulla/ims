"use client";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridCallbackDetails,
  GridRowParams,
  MuiEvent,
} from "@mui/x-data-grid";
import { useState } from "react";
import CustomModal from "../components/modal";
import Product from "../components/product";

import { Items, ProductColumns } from "@/constant";
import { ProductProps } from "@/types";

const Products = () => {
  const [openModal, setOpenModal] = useState(false);
  const [rowData, setRowData] = useState<ProductProps | null>(null);

  const paginationModel = { page: 0, pageSize: 10 };
  const columns = [...ProductColumns];

  const handleRowClick = (
    params: GridRowParams,
    event: MuiEvent<React.MouseEvent<HTMLElement>>,
    details: GridCallbackDetails
  ) => {
    // console.log(params);
    // console.log(details);
    setRowData(params.row);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          padding: "2rem",
        }}
      >
        <DataGrid
          rows={Items}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          rowHeight={30}
          onRowClick={handleRowClick}
        />
      </Box>

      <CustomModal
        open={openModal}
        handleClose={handleModalClose}
        title={rowData?.name || ""}
      >
        <Product prod={rowData} />
      </CustomModal>
    </>
  );
};

export default Products;

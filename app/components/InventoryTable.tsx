"use client";

import { Box, Button } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import {
  DataGrid,
  GridCallbackDetails,
  GridRowParams,
  MuiEvent,
} from "@mui/x-data-grid";
import { useState } from "react";

import CustomModal from "@/app/components/CustomModal";
import Product from "@/app/components/Product";
import { EmptyProduct, ProductColumns } from "@/constant";
import { ProductProps } from "@/types";

type InventoryTableProps = {
  Items: ProductProps[];
};

const InventoryTable: React.FC<InventoryTableProps> = ({ Items }) => {
  const [openModal, setOpenModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [rowData, setRowData] = useState<ProductProps>(EmptyProduct);

  const paginationModel = { page: 0, pageSize: 10 };
  const columns = [...ProductColumns];

  const handleRowClick = (
    params: GridRowParams,
    event: MuiEvent<React.MouseEvent<HTMLElement>>,
    details: GridCallbackDetails
  ) => {
    setRowData(params.row);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setEdit(false);
  };

  // create new button
  const handleCreateNew = () => {
    setRowData(EmptyProduct);
    setOpenModal(true);
    setEdit(true);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          padding: "2rem",
        }}
      >
        <div className="flex flex-row-reverse">
          <Button
            variant="contained"
            size="small"
            className="bg-gray-900 hover:bg-gray-700"
            onClick={handleCreateNew}
          >
            <AddCircle fontSize="small" className="m-1" />
            Create New
          </Button>
        </div>
        <p className="text-red-600 text-sm">
          * Please click on row to view/edit product details
        </p>
        <DataGrid
          rows={Items}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          rowHeight={30}
          onRowClick={handleRowClick}
          disableRowSelectionOnClick
        />
      </Box>

      <CustomModal
        open={openModal}
        handleClose={handleModalClose}
        title={rowData?.name || ""}
      >
        <Product prod={rowData} editDetails={edit} />
      </CustomModal>
    </>
  );
};

export default InventoryTable;

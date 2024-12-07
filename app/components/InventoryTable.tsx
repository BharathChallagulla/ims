"use client";

import { Box, Button, Input } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import {
  DataGrid,
  GridCallbackDetails,
  GridRowParams,
  MuiEvent,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";

import CustomModal from "./CustomModal";
import Product from "./Product";
import { EmptyProduct, ProductColumns } from "@/constant";
import { ProductProps } from "@/types";

type InventoryTableProps = {
  Items: ProductProps[];
};

const InventoryTable: React.FC<InventoryTableProps> = ({ Items }) => {
  const [openModal, setOpenModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [rowData, setRowData] = useState<ProductProps>(EmptyProduct);
  const [filteredProd, setFilteredProd] = useState<ProductProps[]>([...Items]);
  const [searchValue, setSearchValue] = useState("");

  const paginationModel = { page: 0, pageSize: 10 };
  const columns = [...ProductColumns];

  useEffect(() => {
    handleSearch();
  }, [searchValue]);

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const handleRowClick = (
    params: GridRowParams,
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    _event: MuiEvent<React.MouseEvent<HTMLElement>>,
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    _details: GridCallbackDetails
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

  // search Items with name
  const handleSearch = () => {
    const newFilteredProducts = filteredProd.filter((prod: ProductProps) => {
      return prod.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredProd(newFilteredProducts);
    console.log("Bharath", newFilteredProducts);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          padding: "2rem",
        }}
      >
        <div className="flex justify-end items-end">
          <Input
            type="text"
            value={searchValue}
            className="h-5 p-1 text-xs mr-3"
            placeholder="Search Item Name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchValue(e.target.value)
            }
          />
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
          rows={filteredProd}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 20, 50]}
          sx={{ border: 0 }}
          rowHeight={30}
          onRowClick={handleRowClick}
          disableRowSelectionOnClick
        />
      </Box>

      <CustomModal open={openModal} handleClose={handleModalClose}>
        <Product prod={rowData} editDetails={edit} />
      </CustomModal>
    </>
  );
};

export default InventoryTable;

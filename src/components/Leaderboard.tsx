import { SxProps } from "@mui/material";
import { DataGrid, DataGridProps, GridColDef } from "@mui/x-data-grid";
import { rem } from "polished";
import { Team } from "../api/api.types";

const columns: GridColDef[] = [
  {
    field: "id",
    disableColumnMenu: true,
  },
  {
    field: "name",
    headerName: "Name",
    disableColumnMenu: true,
    width: 100,
    editable: false,
  },
];

interface CustomDataGridProps {
  sx?: SxProps;
  rows: Team[];
  paginationModel: DataGridProps["paginationModel"];
  pageSizeOptions: DataGridProps["pageSizeOptions"];
  onPaginationModelChange: DataGridProps["onPaginationModelChange"];
  rowCount: number;
  setRowSelectionModel?: (id: string[]) => void;
  rowSelectionModel: DataGridProps["rowSelectionModel"];
  isLoading: boolean;
}

// const tableColour = "#005891";

export const Leaderbaord = ({
  sx,
  rows,
  paginationModel,
  pageSizeOptions,
  onPaginationModelChange,
  rowCount,
  rowSelectionModel,
  setRowSelectionModel,
  isLoading,
}: CustomDataGridProps) => (
  <DataGrid
    sx={{
      ...sx,
      "& .MuiDataGrid-columnHeaders": {
        backgroundColor: "#D9DFE1",
        color: "black",
        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: "bold",
        },
      },
      "& .MuiDataGrid-virtualScroller": {
        backgroundColor: "white",
      },
      "& .MuiDataGrid-footerContainer": {
        backgroundColor: "#F7F7F7",
        maxHeight: rem(40),
        minHeight: rem(40),
        "& .MuiDataGrid-selectedRowCount": {
          color: "black",
        },
        "& .MuiToolbar-root": {
          color: "black",
          "& .MuiSvgIcon-root": {
            color: "black",
          },
        },
      },
    }}
    rowHeight={40}
    columnHeaderHeight={40}
    getRowId={(row) => row.id}
    columns={columns}
    initialState={{
      columns: {
        columnVisibilityModel: {
          id: false,
        },
      },
    }}
    rows={rows}
    checkboxSelection={false}
    sortingMode="server"
    paginationMode="server"
    rowCount={rowCount}
    pageSizeOptions={pageSizeOptions}
    paginationModel={paginationModel}
    onPaginationModelChange={onPaginationModelChange}
    onRowSelectionModelChange={(newRowSelectionModel) => {
      setRowSelectionModel &&
        setRowSelectionModel(newRowSelectionModel as string[]);
    }}
    rowSelectionModel={rowSelectionModel}
    loading={isLoading}
  />
);
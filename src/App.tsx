import { useQuery } from "react-query";
import { Organisation, Paged } from "./types";
import { OrgTable } from "./components/OrgTable";
import { useState } from "react";
import { Org } from "./components/Org";
import { Stack, Box } from "@mui/material";

const URL= "http://localhost:6789/"

const fetchOrgansations = async (pageSize: number, page: number): Promise<Paged<Organisation>> => {
  const pagedResponse = await fetch(`${URL}organisations?_page=${page + 1}&_limit=${pageSize}`);
  const pagedItems: Organisation[] = await pagedResponse.json();
  const totalReponse =  await fetch(`${URL}organisations`);
  const total: Organisation[] = await totalReponse.json();
  return {
    items: pagedItems,
    pageSize,
    page,
    totalItems: total.length
  }
 };

 const pageSizeOptions = [5,10,15];

export const App = () =>  {

  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const [page, setPage] = useState(0);

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["organisations", pageSize, page],
    queryFn: () =>  fetchOrgansations(pageSize, page),
    keepPreviousData: true,
    staleTime: 5000000
  });

  const [selectedRowId, setSelectedRowId] = useState<number[] | undefined>(undefined)

  return (
    <Box sx={{height: "100%", backgroundColor: "#ECF0F1"}}>
      <Stack flexDirection={"row"} sx={{p: 4}}>      
          <Org/>
          <OrgTable
            sx={{ml: 2}} 
            rows={data?.items ?? []}
            onPaginationModelChange={(model) => {
              console.log(model)
              setPage(model.page);
              setPageSize(model.pageSize);
            }}
            rowCount={data?.totalItems ?? 0} 
            paginationModel={{page, pageSize}}
            pageSizeOptions={pageSizeOptions}
            rowSelectionModel={selectedRowId}
            setRowSelectionModel={setSelectedRowId}
            isLoading={isLoading}
          />
        </Stack>
      </Box>
  );
}
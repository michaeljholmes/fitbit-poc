import { useQuery } from "react-query";
import { Organisation, Paged, User } from "./types";
import { OrgTable } from "./components/OrgTable";
import { useState } from "react";
import { Org } from "./components/Org";
import { Stack, Box } from "@mui/material";

const URL = "http://localhost:6789/";

const fetchOrgansations = async (
  pageSize: number,
  page: number,
): Promise<Paged<Organisation>> => {
  const pagedResponse = await fetch(
    `${URL}organisations?_page=${page + 1}&_limit=${pageSize}`,
  );
  const pagedItems: Organisation[] = await pagedResponse.json();
  const totalReponse = await fetch(`${URL}organisations`);
  const total: Organisation[] = await totalReponse.json();
  return {
    items: pagedItems,
    pageSize,
    page,
    totalItems: total.length,
  };
};

const fetchUsers = async (org: Organisation | undefined): Promise<User[]> => {
  try {
    if (!org) return [];
    const response = await fetch(`${URL}users`);
    const users: User[] = await response.json();
    const orgUsers = users.filter(({ id }) =>
      org.users.some((mid) => mid === id),
    );
    return orgUsers;
  } catch (e) {
    return [];
  }
};

export const App = () => {
  const [pageSize, setPageSize] = useState(2);
  const [page, setPage] = useState(0);

  const { isLoading, data } = useQuery({
    queryKey: ["organisations", pageSize, page],
    queryFn: () => fetchOrgansations(pageSize, page),
  });

  const [selectedRowId, setSelectedRowId] = useState<string[] | undefined>(
    undefined,
  );

  const [selectedOrg, setSelectedOrg] = useState<Organisation | undefined>();

  const { data: userData } = useQuery({
    queryKey: ["users", selectedOrg],
    queryFn: () => fetchUsers(selectedOrg),
    enabled: Boolean(selectedOrg),
  });

  const onSelectedRow = async (row: string[]) => {
    setSelectedRowId(row);
    const org = data?.items.find(({ id }) => id === row[0]);
    if (org) {
      setSelectedOrg(org);
    }
  };

  return (
    <Box sx={{ height: "100%", backgroundColor: "#ECF0F1" }}>
      <Stack flexDirection={"row"} sx={{ p: 4 }}>
        <Org users={userData} />
        <OrgTable
          sx={{ ml: 2 }}
          rows={data?.items ?? []}
          onPaginationModelChange={(model) => {
            console.log(model);
            setPage(model.page);
            setPageSize(model.pageSize);
          }}
          rowCount={data?.totalItems ?? 0}
          paginationModel={{ page, pageSize }}
          pageSizeOptions={[2, 4, 6]}
          rowSelectionModel={selectedRowId}
          setRowSelectionModel={onSelectedRow}
          isLoading={isLoading}
        />
      </Stack>
    </Box>
  );
};

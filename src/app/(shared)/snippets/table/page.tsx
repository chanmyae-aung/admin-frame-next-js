"use client";
import { usePosts } from "@/services/placeholder";
import { Post } from "@/types/posts";
import { Box, Container, Grid } from "@mui/material";
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable
} from "material-react-table";
import { useMemo } from "react";

export default function TablesPage() {
  const { data: posts = [], isLoading } = usePosts();

  const columns = useMemo<MRT_ColumnDef<Post>[]>(
    () => [
      {
        accessorKey: "id", //access nested data with dot notation
        header: "ID",
        size: 80
      },
      {
        accessorKey: "userId", //access nested data with dot notation
        header: "User ID",
        size: 80
      },
      {
        accessorKey: "title",
        header: "Title",
        size: 200
      },
      {
        accessorKey: "body",
        header: "Description",
        size: 400
      }
    ],
    []
  );
  const table = useMaterialReactTable({
    columns,
    data: posts,
    state: {
      showSkeletons: isLoading
    }
  });

  return (
    <Container maxWidth={false}>
      <Box>
        <Grid container columns={12}>
          <Grid item xs={12} className="p-4">
            <MaterialReactTable table={table} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

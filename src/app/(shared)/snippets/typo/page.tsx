"use client";
import Button from "@/components/ui/button";
import { Icons } from "@/components/ui/images/Icons";
import Select from "@/components/ui/inputs/Select";
import TextField from "@/components/ui/inputs/TextField";
import Text from "@/components/ui/typo";
import { top100Films } from "@/data";
import {
  Autocomplete,
  Box,
  Container,
  Grid,
  Paper,
  SelectChangeEvent,
  Stack
} from "@mui/material";
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable
} from "material-react-table";
import { useMemo, useState } from "react";

export default function InputsPage() {
  const [value, setValue] = useState<string>("");
  const [autocompleteValue, setAutocompleteValue] = useState(null);

  return (
    <Container maxWidth={false}>
      <Box>
        <Grid container columns={12}>
          <Grid item xs={12}>
            <Paper className="p-4 space-y-4">
              <Box>
                <Text>h1. Heading with Loading</Text>
                <Text variant="h1" loading>
                  h1. Heading with Loading
                </Text>
              </Box>
              <Text variant="h1">h1. Heading</Text>
              <Text variant="h2">h2. Heading</Text>
              <Text variant="h3">h3. Heading</Text>
              <Text variant="h4">h4. Heading</Text>
              <Text variant="h5">h5. Heading</Text>
              <Text variant="h6">h6. Heading</Text>
              <Text variant="subtitle1">
                subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Quos blanditiis tenetur
              </Text>
              <Text variant="subtitle2">
                subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Quos blanditiis tenetur
              </Text>
              <Text variant="body1">
                body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quos blanditiis tenetur unde suscipit, quam beatae rerum
                inventore consectetur, neque doloribus, cupiditate numquam
                dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
              </Text>
              <Text variant="body2">
                body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quos blanditiis tenetur unde suscipit, quam beatae rerum
                inventore consectetur, neque doloribus, cupiditate numquam
                dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
              </Text>
              <Text variant="button" display="block">
                button text
              </Text>
              <Text variant="caption" display="block">
                caption text
              </Text>
              <Text variant="overline" display="block">
                overline text
              </Text>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

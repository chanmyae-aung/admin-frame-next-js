'use client';
import Button from '@/components/ui/button';
import { Icons } from '@/components/ui/images/Icons';
import Select from '@/components/ui/inputs/Select';
import TextField from '@/components/ui/inputs/TextField';
import Text from '@/components/ui/typo';
import { top100Films } from '@/data';
import { Autocomplete, Box, Container, Grid, Paper, SelectChangeEvent, Stack } from '@mui/material';
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { useMemo, useState } from 'react';

//example data type
type Person = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  city: string;
  state: string;
};

//nested data is ok, see accessorKeys in ColumnDef below
const data: Person[] = [
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Joe',
      lastName: 'Doe',
    },
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Vandy',
    },
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    name: {
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    },
    address: '32188 Larkin Turnpike',
    city: 'Omaha',
    state: 'Nebraska',
  },
];
export default function Home() {
  const loading = false;
  const [value, setValue] = useState<string>('');
  const [autocompleteValue, setAutocompleteValue] = useState(null);

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'name.firstName', //access nested data with dot notation
        header: 'First Name',
        size: 150,
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
        size: 150,
      },
      {
        accessorKey: 'address', //normal accessorKey
        header: 'Address',
        size: 200,
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 150,
      },
      {
        accessorKey: 'state',
        header: 'State',
        size: 150,
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return (
    <Container maxWidth={false}>
      <Box>
        <Grid container columns={12}>
          <Grid item xs={3} className="p-4">
            <Paper className="p-4 space-y-2 flex items-center justify-center">
              <Button variant="contained">Contained Button</Button>
            </Paper>
          </Grid>
          <Grid item xs={3} className="p-4">
            <Paper className="p-4 space-y-2 flex items-center justify-center">
              <Button variant="outlined">Outlined Button</Button>
            </Paper>
          </Grid>
          <Grid item xs={3} className="p-4">
            <Paper className="p-4 space-y-2 flex items-center justify-center">
              <Button variant="outlined" loading>
                Loading Button
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={3} className="p-4">
            <Paper className="p-4 space-y-2 flex items-center justify-center">
              <Button variant="contained" startIcon={<Icons.users />}>
                Icon Button
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={3} className="p-4">
            <Paper className="p-4 space-y-2 flex items-center justify-center">
              <Button variant="contained" disabled>
                Disabled Button
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={3} className="p-4">
            <Paper className="p-4 space-y-2 flex items-center justify-center">
              <Button className="disabled:bg-red-100 !text-black" variant="contained" disabled>
                Disabled Custom Color
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={3} className="p-4">
            <Paper className="p-4 space-y-2 flex items-center justify-center">
              <Button className="bg-red-400 hover:bg-red-500" variant="contained">
                Custom Color
              </Button>
            </Paper>
          </Grid>
        </Grid>

        <Grid container columns={12}>
          <Grid item xs={3} className="p-4">
            <Paper className="p-4 space-y-2 flex items-center justify-center">
              <TextField placeholder="Without Label" />
            </Paper>
          </Grid>
          <Grid item xs={3} className="p-4">
            <Paper className="p-4 space-y-2 flex items-center justify-center">
              <TextField label="With Label" />
            </Paper>
          </Grid>
          <Grid item xs={3} className="p-4">
            <Paper className="p-4 space-y-2 flex items-center justify-center">
              <TextField
                label="Custom Color TextField"
                //TODO: rewrite this sx in TextFieldStyled
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: '1px solid yellow', // default border color
                    },
                    '&:hover fieldset': {
                      borderColor: 'green', // hover border color
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'green', // focused border color
                    },
                  },
                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={3} className="p-4">
            <Paper className="p-4 space-y-2 flex items-center justify-center">
              <TextField
                error
                id="outlined-error-helper-text"
                label="Error"
                defaultValue="Hello World"
                helperText="Incorrect entry."
              />
            </Paper>
          </Grid>
          <Grid item xs={3} className="p-4">
            <Paper className="p-4 space-y-2 flex items-center justify-center">
              <TextField
                id="outlined-multiline-static"
                label="Multiline"
                multiline
                rows={4}
                defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit."
              />
            </Paper>
          </Grid>
        </Grid>
        <Grid container columns={12}>
          <Grid item xs={3} className="p-4">
            <Paper className="p-4 space-y-2 flex items-center justify-center">
              <Select
                label="Select"
                options={[
                  {
                    label: 'Select One',
                    value: 'Select One',
                  },
                  {
                    label: 'Select Two',
                    value: 'Select Two',
                  },
                  {
                    label: 'Select Three',
                    value: 'Select Three',
                  },
                ]}
                value={value}
                onChange={(event: SelectChangeEvent) => {
                  setValue(event.target.value as string);
                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={3} className="p-4">
            <Paper className="p-4 space-y-2 flex items-center justify-center">
              <Autocomplete
                disablePortal
                options={top100Films}
                sx={{ width: '100%' }}
                renderInput={params => <TextField {...params} label="Autocomplete" />}
              />
            </Paper>
          </Grid>
        </Grid>

        <Grid container columns={12}>
          <Grid item xs={12} className="p-4">
            <MaterialReactTable table={table} />
          </Grid>
        </Grid>
        <Grid container columns={12}>
          <Grid item xs={12} className="p-4">
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
                subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
                tenetur
              </Text>
              <Text variant="subtitle2">
                subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
                tenetur
              </Text>
              <Text variant="body1">
                body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
                tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus,
                cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
              </Text>
              <Text variant="body2">
                body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
                tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus,
                cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
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

"use client";
import Button from "@/components/ui/button";
import { Icons } from "@/components/ui/images/Icons";
import { Box, Container, Grid, Paper } from "@mui/material";

export default function ButtonsPage() {
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
              <Button
                className="disabled:bg-red-100 !text-black"
                variant="contained"
                disabled
              >
                Disabled Custom Color
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={3} className="p-4">
            <Paper className="p-4 space-y-2 flex items-center justify-center">
              <Button
                className="bg-red-400 hover:bg-red-500"
                variant="contained"
              >
                Custom Color
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

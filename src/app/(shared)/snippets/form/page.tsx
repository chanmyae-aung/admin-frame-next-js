"use client";
import Button from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import TextField from "@/components/ui/inputs/TextField";
import Text from "@/components/ui/typo";
import { SignUpForm, signupSchema } from "@/types/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Container, Grid, Paper } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function FormPage() {
  const [submitData, setSubmitData] = useState<SignUpForm>();
  const form = useForm<SignUpForm>({
    resolver: zodResolver(signupSchema)
  });

  const submit = async (data: SignUpForm) => {
    console.log(data);
    setSubmitData(data);
  };

  return (
    <Container maxWidth={false}>
      <Grid container columns={12}>
        <Grid item xs={12} className="p-4">
          <Paper className="p-4 space-y-8">
            <Text align="center" variant="h5">
              Sample Form
            </Text>
            <Form {...form}>
              <form className="flex-1" onSubmit={form.handleSubmit(submit)}>
                <Box maxWidth="400px" m="auto">
                  <div className="mb-4">
                    <pre>{JSON.stringify(submitData, null, 2)}</pre>
                  </div>
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <TextField label="First Name" {...field} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <TextField label="Last Name" {...field} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <TextField label="Email" {...field} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <TextField label="Password" {...field} password />
                      </FormItem>
                    )}
                  />
                  <div className="text-center">
                    <Button
                      type="submit"
                      className="w-[200px]"
                      variant="contained"
                    >
                      Submit
                    </Button>
                  </div>
                </Box>
              </form>
            </Form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

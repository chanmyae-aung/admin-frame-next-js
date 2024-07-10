"use client";
import Checkbox from "@/components/ui/inputs/Checkbox";
import Radio from "@/components/ui/inputs/Radio";
import Select from "@/components/ui/inputs/Select";
import TextField from "@/components/ui/inputs/TextField";
import TextEditor from "@/components/ui/texteditor";
import Text from "@/components/ui/typo";
import { top100Films } from "@/data";
import {
  Autocomplete,
  Box,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  Paper,
  RadioGroup,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

const exampleContent =
  '<h2 style="text-align: center">Hey there 👋</h2><p>This is a <em>basic</em> example of <code>mui-tiptap</code>, which combines <a target="_blank" rel="noopener noreferrer nofollow" href="https://tiptap.dev/">Tiptap</a> with customizable <a target="_blank" rel="noopener noreferrer nofollow" href="https://mui.com/">MUI (Material-UI)</a> styles, plus a suite of additional components and extensions! Sure, there are <strong>all <em>kinds</em> of <s>text</s> <u>formatting</u> options</strong> you’d probably expect from a rich text editor. But wait until you see the <span data-type="mention" data-id="15" data-label="Axl Rose">@Axl Rose</span> mentions and lists:</p><ul><li><p>That’s a bullet list with one …</p></li><li><p>… or two list items.</p></li></ul><p>Isn’t that great? And all of that is editable. <strong><span style="color: #ff9900">But wait, </span><span style="color: #403101"><mark data-color="#ffd699" style="background-color: #ffd699; color: inherit">there’s more!</mark></span></strong> Let’s try a code block:</p><pre><code class="language-css">body {\n  display: none;\n}</code></pre><p></p><p>That’s only the tip of the iceberg. Feel free to add and resize images:</p><img height="auto" src="https://picsum.photos/600/400" alt="random image" width="350" style="aspect-ratio: 3 / 2"><p></p><p>Organize information in tables:</p><table><tbody><tr><th colspan="1" rowspan="1"><p>Name</p></th><th colspan="1" rowspan="1"><p>Role</p></th><th colspan="1" rowspan="1"><p>Team</p></th></tr><tr><td colspan="1" rowspan="1"><p>Alice</p></td><td colspan="1" rowspan="1"><p>PM</p></td><td colspan="1" rowspan="1"><p>Internal tools</p></td></tr><tr><td colspan="1" rowspan="1"><p>Bob</p></td><td colspan="1" rowspan="1"><p>Software</p></td><td colspan="1" rowspan="1"><p>Infrastructure</p></td></tr></tbody></table><p></p><p>Or write down your groceries:</p><ul data-type="taskList"><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p>Milk</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Eggs</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Sriracha</p></div></li></ul><blockquote><p>Wow, that’s amazing. Good work! 👏 <br>— Mom</p></blockquote><p>Give it a try and click around!</p>';

export default function InputsPage() {
  const [value, setValue] = useState<string>("");
  const [checked, setChecked] = useState<boolean>();
  const [radioValue, setRadioValue] = useState<string>("female");
  const [editorValue, setEditorValue] = useState<string>(exampleContent);
  const [editorEditableValue, setEditorEditableValue] =
    useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
  };

  return (
    <Container>
      <Box>
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
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "1px solid yellow", // default border color
                    },
                    "&:hover fieldset": {
                      borderColor: "green", // hover border color
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "green", // focused border color
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
                    label: "Select One",
                    value: "Select One",
                  },
                  {
                    label: "Select Two",
                    value: "Select Two",
                  },
                  {
                    label: "Select Three",
                    value: "Select Three",
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
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Autocomplete" />
                )}
              />
            </Paper>
          </Grid>
        </Grid>
        <Grid container columns={12}>
          <Grid item xs={3} className="p-4">
            <Paper className="p-4 space-y-2">
              <Text variant="subtitle2" className="text-sm italic text-red-500">
                Please follow FormGroup from docs*
              </Text>
              <FormControl error={!checked}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Default Checked"
                  />
                  <div>
                    <FormControlLabel
                      required
                      control={<Checkbox onChange={handleChange} />}
                      label="Required"
                    />
                    <FormHelperText>You can display an error</FormHelperText>
                  </div>
                  <FormControlLabel
                    disabled
                    control={<Checkbox />}
                    label="Disabled"
                  />
                </FormGroup>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={3} className="p-4">
            <Paper className="p-4 space-y-2">
              <Text variant="subtitle2" className="text-sm italic text-red-500">
                Please follow RadioGroup from docs*
              </Text>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Gender
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={radioValue}
                  onChange={handleRadioChange}
                  defaultValue="female"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={12} className="p-4">
            <Paper className="p-4 space-y-2">
              <TextEditor
                value={editorValue}
                setValue={setEditorValue}
                editable={editorEditableValue}
                setEditable={setEditorEditableValue}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

import { Lock, LockOpen, TextFields } from "@mui/icons-material";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import type { EditorOptions } from "@tiptap/core";
import { useCallback, useRef, useState } from "react";
import {
  LinkBubbleMenu,
  RichTextEditor,
  RichTextReadOnly,
  TableBubbleMenu,
  type RichTextEditorRef,
} from "mui-tiptap";
import useExtensions from "./useExtension";
import EditorMenuControls from "./EditorMenuControl";

interface EditorProps {
  value?: string;
  setValue: (value: string) => void;
  onSave?: () => void;
  onCancel?: () => void;
  editable?: boolean;
  setEditable: (value: boolean) => void;
}

const TextEditor: React.FC<EditorProps> = ({
  value = "",
  setValue = () => {},
  onSave,
  onCancel,
  editable = false,
  setEditable,
}) => {
  const extensions = useExtensions({
    placeholder: "Add your own content here...",
  });
  const rteRef = useRef<RichTextEditorRef>(null);

  return (
    <>
      <Box>
        {editable ? (
          <Grid container spacing={2} className="pb-4">
            <Grid item>
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  setValue(rteRef.current?.editor?.getHTML() ?? "");
                  setEditable(false);
                  if (onCancel) {
                    onCancel();
                  }
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  setValue(rteRef.current?.editor?.getHTML() ?? "");
                  setEditable(false);
                  if (onSave) {
                    onSave();
                  }
                }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={2} className="pb-4">
            <Grid item>
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  setEditable(true);
                }}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        )}
        <RichTextEditor
          ref={rteRef}
          extensions={extensions}
          editable={editable}
          content={value}
          renderControls={() => <EditorMenuControls />}
        >
          {() => (
            <>
              <LinkBubbleMenu />
              <TableBubbleMenu />
            </>
          )}
        </RichTextEditor>
      </Box>
    </>
  );
};

export default TextEditor;

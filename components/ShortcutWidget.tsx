import { useEffect, useState } from "react";
import ShortcutButton from "./ShortcutButton";
import { Grid, Paper } from "@mui/material";

const ShortcutWidget: React.VFC = () => {
  const [sessionState, setSessionState] = useState<string[]>([]);
  useEffect(() => {
    setSessionState(["1", "2", "3"]);
  }, []);
  return (
    <Paper
      elevation={6}
      sx={{
        margin: "10px",
      }}
    >
      <Grid container spacing={2}>
        {sessionState.map((state, index) => (
          <Grid item xs={4} sm={3} md={2} lg={1} key={state}>
            <ShortcutButton
              onClick={() => {
                console.log("click");
              }}
              borderColor={"aqua"}
              src="jkj"
              alt={state}
              size={80}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default ShortcutWidget;

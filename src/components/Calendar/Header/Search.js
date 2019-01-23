import React from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

const Search = () => (
  <FormControl fullWidth>
    <TextField variant="outlined" label="Search for a user..." />
  </FormControl>
);

export default Search;

import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchField = ({ placeholder, value, onChange }) => {
  return (
    <TextField
      placeholder={placeholder}
      variant="outlined"
      size="small"
      value={value}
      onChange={onChange}
      sx={{
        width: '500px',
        '& .MuiOutlinedInput-root': {
          borderRadius: '12px',
          padding: '0 8px',
        },
      }}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end" sx={{pr: '8px'}}>
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default SearchField;
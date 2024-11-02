import React from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';

const Filter = ({ sortOption, onSortChange }) => {
  return (
    <FormControl variant="standard" sx={{ marginLeft: '20px', minWidth: 120 }}>
      <Select
        value={sortOption}
        onChange={onSortChange}
        sx={{ fontSize: '14px', p: '3px 6px', mr: '10px' }}
      >
        <MenuItem value="recent">최근등록순</MenuItem>
        <MenuItem value="deadline">마감일순</MenuItem>
        <MenuItem value="views">조회순</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Filter;

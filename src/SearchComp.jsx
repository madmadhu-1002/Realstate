import React from 'react'
import { Autocomplete } from '@react-google-maps/api';
import UnstyledInputBasic from './UnstyledInputBasic';
const SearchComp = (props) => {
  
  return (
    <div style={{ width: '100%' }}>
        <Autocomplete>
      <UnstyledInputBasic type={props.type}/>
      </Autocomplete>
    </div>
  )
}

export default SearchComp
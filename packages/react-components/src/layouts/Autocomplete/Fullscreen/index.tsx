import React from 'react';
import { connectSuggestions } from '@findify/react-connect';

export default connectSuggestions(({ suggestions }) => console.log(suggestions) || <div>HOOOOY</div>);

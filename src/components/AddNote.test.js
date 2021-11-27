import React from "react";
import { shallow } from "enzyme";
import AddNotes from "./AddNotes"
it('should render', ()=>{
const wrapper=shallow(<AddNotes/>)
const span=wrapper.find('span');
const result=span.text();
expect(result).toBe('close')
})
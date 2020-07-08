import React from "react";
import ReactDOM from "react-dom";
import { configure, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Start from './Start';

configure({ adapter: new Adapter() });

const component = shallow(<Start />);
const node_butt = component.find('button');
const node_div = component.find('div')
it(`render Start`, () => {
    //expect(component).toMatchSnapshot();
    expect(node_butt).toBeTruthy();
    expect(node_butt.text()).toEqual('Press to start!');

    expect(node_div.hasClass('start')).toBeTruthy();
});
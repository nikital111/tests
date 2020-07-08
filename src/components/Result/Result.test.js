import React from "react";
import ReactDOM from "react-dom";
import { configure, render, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Result } from './Result';

configure({ adapter: new Adapter() });
const props = {
    rating: 3,
    max: 4,
    reset: jest.fn()
}
const component = shallow(<Result {...props} />);

it(`render Result`, () => {
    expect(component).toBeTruthy();
    expect(component.find('.startNew').text()).toEqual('Start a new test!');
    expect(component.find('.emotion').text()).toEqual('Not bad!');
    expect(component.find('.balls').html()).toEqual(`<div class="balls">${props.rating}/${props.max}<div>You got ${props.rating * (12 / props.max)} balls!!!</div></div>`);
});

it('simulate reset', () => {
    component.find('.startNew').simulate('click');
    expect(props.reset).toHaveBeenCalledTimes(1);

})
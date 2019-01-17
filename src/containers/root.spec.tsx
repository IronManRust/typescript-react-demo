import * as React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { expect } from "chai";
import { Root } from "./root";

configure({ "adapter": new Adapter() });

describe("Component - Root", () => {
    it("Renders", () => {
        const wrapper = shallow(<Root />);
        expect(wrapper.find(".container-root").first().children().length).to.equal(1);
    });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../../lib/errors");
var chai = require("chai");
var expect = chai.expect;
describe("errors.js", function () {
    it("should return expected message", function () {
        var e = { message: "bad thing", code: "123" };
        var err = errors_1.wrapErr(e, "another bad thing");
        expect(err.message).to.be.eql("bad thing -> another bad thing");
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdGVzdC91bml0L2Vycm9ycy50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQTBDO0FBQzFDLDJCQUE4QjtBQUM5QixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBRTNCLFFBQVEsQ0FBQyxXQUFXLEVBQUU7SUFDckIsRUFBRSxDQUFDLGdDQUFnQyxFQUFFO1FBQ3BDLElBQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUE7UUFDL0MsSUFBTSxHQUFHLEdBQUcsZ0JBQU8sQ0FBQyxDQUFDLEVBQUUsbUJBQW1CLENBQUMsQ0FBQTtRQUMzQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7SUFDakUsQ0FBQyxDQUFDLENBQUE7QUFDSCxDQUFDLENBQUMsQ0FBQSJ9
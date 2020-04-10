let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect();
chai.use(chaiHttp);

/* Constants */
var Route = "/user/login"
var Url = "http://54.193.77.192:3000"

/* Test Cases */

// TC-5 //
var TEST_CASE_NO = "TC-5"
var TEST_CASE_DESC = "Purpose: "
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        var Inputs =
        {
            Username: "Test_User",
            Password: "test_password",
        }
        chai.request(Url)
            .post(Route)
            .send(Inputs)
            .end((err, res) => {
                var Response = JSON.parse(res.text)
                Response.should.have.property('message');
                Response.should.have.property('result');
                Response.should.have.property('User_Id');
                done();
        });
    });
});
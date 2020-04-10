let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect();
chai.use(chaiHttp);

/* Constants */
var Route = "/user/signup"
var Url = "http://54.193.77.192:3000"

/* Test Cases */

// TC-1 //
var TEST_CASE_NO = "TC-1"
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a user signup request and responds with correct format."
var Inputs =
    {
        Username: "Test_User",
        Password: "test_password",
        Firstname: "Test",
        Lastname: "Test",
        Email: "testuser@test.com"
    }
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        chai.request(Url)
            .post(Route)
            .send(Inputs)
            .end((err, res) => {
                var Response = JSON.parse(res.text)
                //console.log(JSON.parse(res.text))
                Response.should.have.property('message');
                Response.should.have.property('result');
                Response.should.have.property('User_Id');
                done();
        });
    });
});

// TC-3 //
var TEST_CASE_NO = "TC-3"
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a user signup request and responds with the correct output when the inputs are empty strings."
var Inputs =
    {
        Username: "",
        Password: "",
        Firstname: "",
        Lastname: "",
        Email: ""
    }
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        chai.request(Url)
            .post(Route)
            .send(Inputs)
            .end((err, res) => {
                var Response = JSON.parse(res.text)
                Response["message"].should.equal('failed');
                done();
        });
    });
});


// TC-4 //
var TEST_CASE_NO = "TC-4"
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a user signup request and responds with the correct output when no inputs are defined.."
var Inputs =
    {
    }
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        chai.request(Url)
            .post(Route)
            .send(Inputs)
            .end((err, res) => {
                var Response = JSON.parse(res.text)
                Response["message"].should.equal('failed');
                done();
        });
    });
});


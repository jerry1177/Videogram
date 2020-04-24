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
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a user signup request and responds with correct json format."
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        var Inputs =
        {
            Username: "Test_User5",
            Password: "test_password",
            Firstname: "Test",
            Lastname: "Test",
            Email: "testuser@test.com"
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

// TC-2 //
var TEST_CASE_NO = "TC-2"
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a user signup request and responds with the correct output when a user has been successfully entered into the database."
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        var Inputs =
        {
            Username: "Test_User6",
            Password: "test_password",
            Firstname: "Test",
            Lastname: "Test",
            Email: "testuser@test.com"
        }
        chai.request(Url)
            .post(Route)
            .send(Inputs)
            .end((err, res) => {
                var Response = JSON.parse(res.text)
                Response["message"].should.equal('success');
                Response["User_Id"].should.to.be.at.least(1);
                done();
        });
    });
});

// TC-3 //
var TEST_CASE_NO = "TC-3"
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a user signup request and responds with the correct output when the inputs are empty strings."
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        var Inputs =
        {
            Username: "",
            Password: "",
            Firstname: "",
            Lastname: "",
            Email: ""
        }
        chai.request(Url)
            .post(Route)
            .send(Inputs)
            .end((err, res) => {
                var Response = JSON.parse(res.text)
                Response["message"].should.equal('failed');
                Response["result"].should.equal("invalid request");
                done();
        });
    });
});


// TC-4 //
var TEST_CASE_NO = "TC-4"
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a user signup request and responds with the correct output when no inputs are defined."
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        var Inputs =
        {
        }
        chai.request(Url)
            .post(Route)
            .send(Inputs)
            .end((err, res) => {
                var Response = JSON.parse(res.text)
                Response["message"].should.equal('failed');
                Response["result"].should.equal("invalid request");
                done();
        });
    });
});


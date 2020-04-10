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
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a user login request and responds with the correct json format."
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        var Inputs =
        {
            Username: "Admin",
            Password: "root",
        }
        chai.request(Url)
            .post(Route)
            .send(Inputs)
            .end((err, res) => {
                var Response = JSON.parse(res.text)
                Response.should.have.property('message');
                Response.should.have.property('result');
                Response.should.have.property('User_Id');
                console.log(Response)
                done();
        });
    });
});

// TC-6 //
var TEST_CASE_NO = "TC-6"
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a user login request and responds with the correct output when a user has entered a successful username and password."
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        var Inputs =
        {
            Username: "Admin",
            Password: "root"
        }
        chai.request(Url)
            .post(Route)
            .send(Inputs)
            .end((err, res) => {
                var Response = JSON.parse(res.text)
                Response["message"].should.equal('success');
                Response["User_Id"].should.to.be.at.least(1);
                console.log(Response)
                done();
        });
    });
});

// TC-7 //
var TEST_CASE_NO = "TC-7"
var TEST_CASE_DESC = "Purpose:"
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        var Inputs =
        {
            Username: "Admin",
            Password: "wrong_pass"
        }
        chai.request(Url)
            .post(Route)
            .send(Inputs)
            .end((err, res) => {
                var Response = JSON.parse(res.text)
                Response["message"].should.equal('failed');
                Response["result"].should.equal('incorrect password');
                console.log(Response)
                done();
        });
    });
});


// TC-8 //
var TEST_CASE_NO = "TC-8"
var TEST_CASE_DESC = "Purpose:"
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        var Inputs =
        {
            Username: "Wrong_User",
            Password: "root"
        }
        chai.request(Url)
            .post(Route)
            .send(Inputs)
            .end((err, res) => {
                var Response = JSON.parse(res.text)
                Response["message"].should.equal('failed');
                Response["result"].should.equal('incorrect username');
                console.log(Response)
                done();
        });
    });
});

// TC-9 //
var TEST_CASE_NO = "TC-9"
var TEST_CASE_DESC = "Purpose:"
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        var Inputs =
        {
            Username: "",
            Password: ""
        }
        chai.request(Url)
            .post(Route)
            .send(Inputs)
            .end((err, res) => {
                var Response = JSON.parse(res.text)
                Response["message"].should.equal('failed');
                Response["result"].should.equal('invalid request');
                console.log(Response)
                done();
        });
    });
});


// TC-10 //
var TEST_CASE_NO = "TC-10"
var TEST_CASE_DESC = "Purpose:"
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
                Response["result"].should.equal('invalid request');
                console.log(Response)
                done();
        });
    });
});


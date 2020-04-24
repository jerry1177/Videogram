let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect();
chai.use(chaiHttp);

/* Constants */
var Route = "/user/video/comments"
var Url = "http://54.193.77.192:3000"

/* Test Cases */

// TC-35 //
var TEST_CASE_NO = "TC-35"
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a user video comments request and responds with the correct json format."
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        var Inputs =
        {
            Video_Id: "68"
        }
        chai.request(Url)
            .post(Route)
            .send(Inputs)
            .end((err, res) => {
                var Response = JSON.parse(res.text)
                //console.log(Response);
                Response.should.have.property('message');
                Response.should.have.property('result');
                done();
        });
    });
});


// TC-36 //
var TEST_CASE_NO = "TC-36"
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a user video comments request and responds with the correct output when a user has entered a successful Video_Id."
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        var Inputs =
        {
            Video_Id: "68"
        }
        chai.request(Url)
            .post(Route)
            .send(Inputs)
            .end((err, res) => {
                var Response = JSON.parse(res.text)
                //console.log(Response);
                Response["message"].should.equal('success');
                Response["result"].should.be.a('array');
                done();
        });
    });
});


// TC-37 //
var TEST_CASE_NO = "TC-37"
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a user video comments request and responds with the correct output when the inputs are empty strings."
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        var Inputs =
        {
            Video_Id: ""
        }
        chai.request(Url)
            .post(Route)
            .send(Inputs)
            .end((err, res) => {
                var Response = JSON.parse(res.text)
                //console.log(Response);
                Response["message"].should.equal('failed');
                Response["result"].should.equal("invalid request");
                done();
        });
    });
});


// TC-38 //
var TEST_CASE_NO = "TC-38"
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a user video comments request and responds with the correct output when no inputs are defined."
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
                //console.log(Response);
                Response["message"].should.equal('failed');
                Response["result"].should.equal("invalid request");
                done();
        });
    });
});
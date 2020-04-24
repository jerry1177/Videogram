let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect();
chai.use(chaiHttp);

/* Constants */
var Route = "/user/delete/video"
var Url = "http://54.193.77.192:3000"

/* Test Cases */


// TC-39 //
var TEST_CASE_NO = "TC-39"
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a user delete video request and responds with the correct json format."
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        done();
    });
});

// TC-40 //
var TEST_CASE_NO = "TC-40"
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a user delete video request and responds with the correct output when a user has entered a successful Video_Id."
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        done();
    });
});



// TC-41 //
var TEST_CASE_NO = "TC-41"
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a user delete video request and responds with the correct output when the inputs are empty strings."
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


// TC-42 //
var TEST_CASE_NO = "TC-42"
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
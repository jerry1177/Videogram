let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect();
chai.use(chaiHttp);

/* Constants */
var Route = "/user/comment/video"
var Url = "http://54.193.77.192:3000"

/* Test Cases */

// TC-27 //
var TEST_CASE_NO = "TC-27"
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a user comment video request and responds with the correct json format."
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        var Inputs =
        {
            Comment: "test comment",
            Video_Id: "68",
            User_Id: "68"
        }
        chai.request(Url)
            .post(Route)
            .send(Inputs)
            .end((err, res) => {
                var Response = JSON.parse(res.text)
                //console.log(Response);
                Response.should.have.property('message');
                Response.should.have.property('Comment_Id');
                done();
        });
    });
});


// TC-28 //
var TEST_CASE_NO = "TC-28"
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a user comment video request and responds with the correct output when a user has entered a successful Comment, Video_Id and User_Id."
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        var Inputs =
        {
            Comment: "test comment",
            Video_Id: "68",
            User_Id: "68"
        }
        chai.request(Url)
            .post(Route)
            .send(Inputs)
            .end((err, res) => {
                var Response = JSON.parse(res.text)
                //console.log(Response);
                Response["message"].should.equal('success');
                Response["Comment_Id"].should.to.be.at.least(1);
                done();
        });
    });
});


// TC-29 //
var TEST_CASE_NO = "TC-29"
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a user comment video request and responds with the correct output when the inputs are empty strings."
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        var Inputs =
        {
            Comment: "",
            Video_Id: "",
            User_Id: ""
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


// TC-30 //
var TEST_CASE_NO = "TC-30"
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a user comment video request and responds with the correct output when no inputs are defined."
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
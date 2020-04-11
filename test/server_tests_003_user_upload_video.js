let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect();
chai.use(chaiHttp);

/* Constants */
var Route = "/user/upload/video"
var Url = "http://54.193.77.192:3000"

/* Test Cases */

// TC-11 //
var TEST_CASE_NO = "TC-11"
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a user upload video request and responds with correct json format."
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        var Inputs =
        {
            Video_Link: "test.com",
            User_Id: "68",
            Upload_Date: "2020-05-01T01:01:01.000Z"
        }
        chai.request(Url)
            .post(Route)
            .send(Inputs)
            .end((err, res) => {
                var Response = JSON.parse(res.text)
                //console.log(Response);
                Response.should.have.property('message');
                Response.should.have.property('result');
                Response.should.have.property('Video_Id');
                done();
        });
    });
});


// TC-12 //
var TEST_CASE_NO = "TC-12"
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a user upload video request and responds with the correct output when a user has entered successful video data."
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        var Inputs =
        {
            Video_Link: "test.com",
            User_Id: "68",
            Upload_Date: "2020-05-01T01:01:01.000Z"
        }
        chai.request(Url)
            .post(Route)
            .send(Inputs)
            .end((err, res) => {
                var Response = JSON.parse(res.text)
                //console.log(Response);
                Response["message"].should.equal('success');
                Response["Video_Id"].should.to.be.at.least(1);
                done();
        });
    });
});


// TC-13 //
var TEST_CASE_NO = "TC-13"
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a user upload video request and responds with the correct output when the inputs are empty strings."
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        var Inputs =
        {
            Video_Link: "",
            User_Id: "",
            Upload_Date: ""
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

// TC-14 //
var TEST_CASE_NO = "TC-14"
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a user upload video data request and responds with the correct output when no inputs are defined."
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

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect();
chai.use(chaiHttp);

/* Constants */
var Route = "/get/video/data"
var Url = "http://54.193.77.192:3000"

/* Test Cases */

// TC-15 //
var TEST_CASE_NO = "TC-15"
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a get video data request and responds with the correct json format."
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        var Inputs =
        {
            Video_Id: "68",
        }
        chai.request(Url)
            .post(Route)
            .send(Inputs)
            .end((err, res) => {
                var Response = JSON.parse(res.text)
                //console.log(Response);
                Response.should.have.property('message');
                Response.should.have.property('result');
                Response["result"].should.have.property("Video_Id");
                Response["result"].should.have.property("Video_Link");
                Response["result"].should.have.property("Upload_Date");
                Response["result"].should.have.property("Active");
                Response["result"].should.have.property("Description");
                Response["result"].should.have.property("Title");
                Response["result"].should.have.property("User");
                Response["result"].should.have.property("Length");
                Response["result"].should.have.property("Resolution");
                Response["result"].should.have.property("Fps");
                Response["result"].should.have.property("Format");
                Response["result"].should.have.property("Location");
                done();
        });
    });
});


// TC-16 //
var TEST_CASE_NO = "TC-16"
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a get video data request and responds with the correct output when a user has entered successful video data."
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        var Inputs =
        {
            Video_Id: "68",
        }
        chai.request(Url)
            .post(Route)
            .send(Inputs)
            .end((err, res) => {
                var Response = JSON.parse(res.text)
                //console.log(Response);
                Response["message"].should.equal('success');
                Response["result"].should.be.a('object');
                Response["result"]["Video_Id"].should.to.be.at.least(1);
                Response["result"]["Video_Link"].should.not.equal(null);
                Response["result"]["Upload_Date"].should.not.equal(null);
                done();
        });
    });
});


// TC-17 //
var TEST_CASE_NO = "TC-17"
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a get video data request and responds with the correct output when the inputs are empty strings."
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        var Inputs =
        {
            Video_Id: "",
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


// TC-18 //
var TEST_CASE_NO = "TC-18"
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a get video data request and responds with the correct output when no inputs are defined."
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
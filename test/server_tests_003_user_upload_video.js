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
            Date: "2020-05-01"
        }
        chai.request(Url)
            .post(Route)
            .send(Inputs)
            .end((err, res) => {
                var Response = JSON.parse(res.text)
                Response.should.have.property('message');
                Response.should.have.property('result');
                Response.should.have.property('Video_Id');
                done();
        });
    });
});
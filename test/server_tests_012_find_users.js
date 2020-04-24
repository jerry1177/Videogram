let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect();
chai.use(chaiHttp);

/* Constants */
var Route = "/find/users"
var Url = "http://54.193.77.192:3000"

/* Test Cases */


// TC-43 //
var TEST_CASE_NO = "TC-43"
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a find users request and responds with the correct json format."
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        chai.request(Url)
            .get(Route)
            .send()
            .end((err, res) => {
                var Response = JSON.parse(res.text)
                //console.log(Response);
                Response.should.have.property('message');
                Response.should.have.property("result");
                done();
        });
    });
});

// TC-44 //
var TEST_CASE_NO = "TC-44"
var TEST_CASE_DESC = "Purpose: This test case verifies that the back end server application handles a find users request and responds with the correct output."
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        chai.request(Url)
            .get(Route)
            .send()
            .end((err, res) => {
                var Response = JSON.parse(res.text)
                //console.log(Response);
                Response["message"].should.equal('success');
                Response["result"].should.be.a('array');
                done();
        });
    });
});

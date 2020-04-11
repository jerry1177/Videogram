let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect();
chai.use(chaiHttp);

/* Constants */
var Route = "/get/all/user/video/data"
var Url = "http://54.193.77.192:3000"

/* Test Cases */

// TC-19 //
var TEST_CASE_NO = "TC-19"
var TEST_CASE_DESC = "Purpose: "
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
                Response["result"].should.be.a('array');
                done();
        });
    });
});


// TC-20 //
var TEST_CASE_NO = "TC-20"
var TEST_CASE_DESC = "Purpose: "
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
                console.log(Response);
                Response["message"].should.equal('success');
                Response["result"].should.be.a('array');
                for (var i = 0; i < Response["result"].length; i++) {
                    Response["result"][i]["Video_Id"].should.to.be.at.least(1);
                    Response["result"][i]["Video_Link"].should.not.equal(null);
                    Response["result"][i]["Upload_Date"].should.not.equal(null);
                }
                done();
        });
    });
});


// TC-21 //
var TEST_CASE_NO = "TC-21"
var TEST_CASE_DESC = "Purpose: "
describe(TEST_CASE_NO, () => {
    it(TEST_CASE_DESC, (done) => {
        var Inputs =
        {
            User_Id: "",
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


// TC-22 //
var TEST_CASE_NO = "TC-22"
var TEST_CASE_DESC = "Purpose: "
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
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

/*
* Test the / route
*/
var TEST_CASE_NO = "UTC-1"
var TEST_CASE_DESC = "Purpose: This unit test case verifies that the back end server application handles a user signup request and responds with correct format."
var Inputs =
    {
        Username: "Test_User",
        Password: "test_password",
        Firstname: "Test",
        Lastname: "Test",
        Email: "testuser@test.com"
    }
var Route = "/user/signup"
var Url = "http://54.193.77.192:3000"
describe(TEST_CASE_NO, () => {
  it(TEST_CASE_DESC, (done) => {
      /*let Req = {
            Username: "Test_User",
            Password: "test_password",
            Firstname: "Test",
            Lastname: "Test",
            Email: "testuser@test.com"
      }*/
    chai.request(Url)
        .post(Route)
        //.set('Content-Type', 'application/json')
        .send(Inputs)
        .end((err, res) => {
              var RESULT = JSON.parse(res.text)
              //res.should.have.status(200);
              //res.body.should.be.a('object');
              console.log(JSON.parse(res.text))
              RESULT["result"].should.be.a('array')
              //res.body.should.be.a('object');
              //res.body.should.have.property('errors');
              //res.body.errors.should.have.property('pages');
              //res.body.errors.pages.should.have.property('kind').eql('required');
          done();
        });
  });

});


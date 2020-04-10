let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

/*
* Test the / route
*/
var Route = "/user/signup"
describe(Route, () => {
  it('/user/signup endpoint should return something', (done) => {
      let Req = {
            Username: "Test_User",
            Password: "test_password",
            Firstname: "Test",
            Lastname: "Test",
            Email: "testuser@test.com"
      }
    chai.request("http://54.193.77.192:3000")
        .post(Route)
        .set('Content-Type', 'application/json')
        .send(Req)
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


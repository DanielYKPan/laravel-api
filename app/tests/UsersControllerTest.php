<?php


class UsersControllerTest extends TestCase{

    var $user_repository_mock;

    public function setUp()
    {
        parent::setUp();
        $this->user_repository_mock = $this->mock('Acme\Repo\User\UserRepositoryInterface');
    }

    private function mock($class)
    {
        $mock = Mockery::mock($class);
        $this->app->instance($class,$mock);
        return $mock;
    }

    public function tearDown()
    {
        Mockery::close();
    }

    public function test_authenticate_user_with_correct_credentials()
    {
        Input::replace($input=['email'=>'test@test.com', 'password'=>'123456']);
        $this->user_repository_mock
            ->shouldReceive("authenticate")
            ->once()
            ->andReturn(true);

        $this->user_repository_mock
            ->shouldReceive('getAuthenticatedUser')
            ->once()
            ->andReturn('good');

        $response = $this->call('POST', 'api/login', $input);
        $response_content = (json_decode($response->getContent()));
        $this->assertResponseStatus(200);
        $this->assertEquals(null, $response_content->errors);
    }

    public function test_authenticate_user_with_wrong_credentials()
    {
        Input::replace($input=['email'=>'test@test.com', 'password'=>'123456']);
        $this->user_repository_mock
            ->shouldReceive("authenticate")
            ->once()
            ->andReturn(false);

        $response = $this->call('POST', 'api/login', $input);
        $response_content = (json_decode($response->getContent()));
        $this->assertResponseStatus(200);
        $this->assertEquals(null, $response_content->user);
        $this->assertEquals(array('The email or the password you entered is incorrect.'), $response_content->errors);
    }

    public function test_get_authorized_user_successfully()
    {
        $this->user_repository_mock
            ->shouldReceive('getAuthenticatedUser')
            ->once()
            ->andReturn('good');

        $response = $this->call('GET', 'api/current-user');
        $response_content = (json_decode($response->getContent()));
        $this->assertResponseStatus(200);
        $this->assertEquals('good', $response_content->user);
    }

    public function test_register_new_user_successfully()
    {
        Input::replace($input=['email'=>'test@test.com',
                               'password'=>'example',
                               'first_name'=>'john',
                               'last_name'=>'doe',
                               'user_role'=>'customer']);
        $this->user_repository_mock
            ->shouldReceive('registerUser')
            ->once()
            ->andReturn(true);
        $this->call('POST', 'api/register', $input);
        $this->assertResponseStatus(200);
    }

    public function test_register_new_user_with_a_failure_response()
    {
        Input::replace($input=['email'=>'test@test.com',
                               'password'=>'example',
                               'first_name'=>'john',
                               'last_name'=>'doe',
                               'user_role'=>'customer']);
        $this->user_repository_mock
            ->shouldReceive('registerUser')
            ->once()
            ->andReturn(false);
        $this->call('POST', 'api/register', $input);
        $this->assertResponseStatus(400);
    }

    /**
     * @expectedException Acme\Service\Exception\FormValidationException
     */
    public function test_register_new_user_with_a_incorrect_email()
    {
        Input::replace($input=['email'=>'wrong_email_format',
                               'password'=>'example',
                               'first_name'=>'john',
                               'last_name'=>'doe',
                               'user_role'=>'customer']);
        $this->user_repository_mock
            ->shouldReceive('registerUser')
            ->never();
        $this->call('POST', 'api/register', $input);
    }

    /**
     * @expectedException Acme\Service\Exception\FormValidationException
     */
    public function test_register_new_user_with_an_empty_email()
    {
        Input::replace($input=['email'=>'',
                               'password'=>'example',
                               'first_name'=>'john',
                               'last_name'=>'doe',
                               'user_role'=>'customer']);
        $this->user_repository_mock
            ->shouldReceive('registerUser')
            ->never();
        $this->call('POST', 'api/register', $input);
    }

    /**
     * @expectedException Acme\Service\Exception\FormValidationException
     */
    public function test_register_new_user_with_an_empty_password()
    {
        Input::replace($input=['email'=>'test@test.com',
                               'password'=>'',
                               'first_name'=>'john',
                               'last_name'=>'doe',
                               'user_role'=>'customer']);
        $this->user_repository_mock
            ->shouldReceive('registerUser')
            ->never();
        $this->call('POST', 'api/register', $input);
    }

    /**
     * @expectedException Acme\Service\Exception\FormValidationException
     */
    public function test_register_new_user_with_an_empty_first_name()
    {
        Input::replace($input=['email'=>'test@test.com',
                               'password'=>'password',
                               'first_name'=>'',
                               'last_name'=>'doe',
                               'user_role'=>'customer']);
        $this->user_repository_mock
            ->shouldReceive('registerUser')
            ->never();
        $this->call('POST', 'api/register', $input);
    }

    /**
     * @expectedException Acme\Service\Exception\FormValidationException
     */
    public function test_register_new_user_with_an_empty_last_name()
    {
        Input::replace($input=['email'=>'test@test.com',
                               'password'=>'password',
                               'first_name'=>'john',
                               'last_name'=>'',
                               'user_role'=>'customer']);
        $this->user_repository_mock
            ->shouldReceive('registerUser')
            ->never();
        $this->call('POST', 'api/register', $input);
    }

    /**
     * @expectedException Acme\Service\Exception\FormValidationException
     */
    public function test_register_new_user_with_an_empty_user_role()
    {
        Input::replace($input=['email'=>'test@test.com',
                               'password'=>'password',
                               'first_name'=>'john',
                               'last_name'=>'doe',
                               'user_role'=>'']);
        $this->user_repository_mock
            ->shouldReceive('registerUser')
            ->never();
        $this->call('POST', 'api/register', $input);
    }
} 
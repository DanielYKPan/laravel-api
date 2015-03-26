<?php

use Acme\Repo\User\UserRepositoryInterface;
use Acme\Service\Validations\Form\User\UserLoginForm;
use Acme\Service\Validations\Form\User\UserRegistrationForm;

class UsersController extends \BaseController {

    /**
     * @var UserRepositoryInterface
     */
    private $user;

    /**
     * @var UserLoginForm
     */
    protected $user_login_form;

    /**
     * @var UserLoginForm
     */
    protected $user_registration_form;

    /**
     * Constructor
     *
     * @param UserRepositoryInterface $user
     * @param Acme\Service\Validations\Form\User\UserLoginForm $user_login_form
     * @param Acme\Service\Validations\Form\User\UserRegistrationForm $user_registration_form
     */
    public function __construct(
                                UserRepositoryInterface $user,
                                UserLoginForm $user_login_form,
                                UserRegistrationForm $user_registration_form
                                    )
    {
        $this->user = $user;
        $this->user_login_form = $user_login_form;
        $this->user_registration_form = $user_registration_form;
    }


    /**
     * Authenticate user's credentials
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function authenticate(){
        $credentials = Input::only('email', 'password');

        //need to check user input(server-side validation)

        // check user's input credentials(email, password);
        if($this->user_login_form->authenticate($credentials)){
            // If the user's credentials correct,
            // return the user and no error.
            return Response::json([
                'user' => $this->user->getAuthenticatedUser(),
                'errors' => null
            ],200);
        }else {
            // Otherwise return null and error messages
            return Response::json([
                'user' => null,
                'errors' => array('The email or the password you entered is incorrect.')
            ],200);
        }
    }

    /**
     * Get the current authorized user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function currentUser() {
        // If no one already authenticated then return null
        return Response::json([
            'user' => $this->user->getAuthenticatedUser()
        ],200);
    }

    /**
     * User Registration
     *
     */
    public function register_user(){
        $registrationInform = Input::only('email','password','first_name','last_name','user_role');

        //Server side validation
        $success = $this->user_registration_form->registerUser($registrationInform);
        if($success){

            //sign in user

            return Response::json([
                'success' => $registrationInform
            ],200);
        }else {
            return Response::json([
                'errors' => 'User Registration could not be processed due to server side problems'
            ],400);
        }
    }

    /**
     * Logout user
     */
    public function logout(){
        $this->user->logoutUser();
    }

    public function fetch_user_by_email(){
        $email = Input::only('email');
        return Response::json([
            'users' => $this->user->fetch_user_by_email($email)
        ],200);
    }
}
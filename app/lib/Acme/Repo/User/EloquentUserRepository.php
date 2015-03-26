<?php


namespace Acme\Repo\User;


use Illuminate\Database\Eloquent\Model;

class EloquentUserRepository implements UserRepositoryInterface {

    /**
     * @var Model
     */
    private $user;

    public function __construct(Model $user)
    {
        $this->user = $user;
    }

    /**
     * Authenticate user's credentials
     *
     * @param $credentials
     * @return bool
     */
    public function authenticate($credentials)
    {
        return \Auth::attempt($credentials);
    }

    /**
     * Get the authenticated user
     * if no one is authenticated then return null
     *
     * @return null|\User
     */
    public function getAuthenticatedUser()
    {
        return \Auth::user();
    }

    /**
     * Log user out
     *
     * @return bool
     */
    public function logoutUser()
    {
        \Auth::logout();
        \Session::flush();
        return true;
    }

    /**
     * Register a user
     *
     * @param $registrationInform
     * @return bool
     */
    public function registerUser($registrationInform)
    {
        $this->user->email = $registrationInform['email'];
        $this->user->first_name = $registrationInform['first_name'];
        $this->user->last_name = $registrationInform['last_name'];
        $this->user->password = $registrationInform['password'];
        $this->user->user_role = $registrationInform['user_role'];

        return $this->user->save();
    }

    /**
     * Fetch a specific user by his email
     *
     * @param $email
     * @return mixed
     */
    public function fetch_user_by_email($email)
    {
        return $this->user->where('email','=', $email)->get();
    }
} 
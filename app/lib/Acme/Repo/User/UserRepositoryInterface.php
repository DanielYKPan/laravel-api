<?php

namespace Acme\Repo\User;

interface UserRepositoryInterface {

    /**
     * Log user out
     *
     * @return bool
     */
    public function logoutUser();

    /**
     * Register a user
     *
     * @param $registrationInform
     * @return bool
     */
    public function registerUser($registrationInform);

    /**
     * Authenticate user's credentials
     *
     * @param $credentials
     * @return bool
     */
    public function authenticate($credentials);

    /**
     * Get the authenticated user
     * if no one is authenticated then return null
     *
     * @return null|\User
     */
    public function getAuthenticatedUser();

    /**
     * Fetch a specific user by his email
     *
     * @param $email
     * @return mixed
     */
    public function fetch_user_by_email($email);
}
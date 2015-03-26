<?php


namespace Acme\Service\Validations\Form\User;

use Acme\Service\Validations\ValidatorInterface;
use Acme\Repo\User\UserRepositoryInterface;

class UserLoginForm {

    /**
     * @var Acme\Service\Validations\ValidatorInterface
     */
    protected $validator;

    /**
     * @var Acme\Repo\User\UserRepositoryInterface
     */
    protected $user;

    /**
     * Constructor
     *
     * @param ValidatorInterface $validator
     * @param UserRepositoryInterface $user
     */
    public function __construct(ValidatorInterface $validator, UserRepositoryInterface $user)
    {
        $this->validator = $validator;
        $this->user = $user;
    }

    /**
     * Attempt to login user
     *
     * @param array $input
     * @return mixed
     */
    public function authenticate(array $credentials)
    {
        $this->validator->with($credentials)->validates();
        return $this->user->authenticate($credentials);
    }
} 
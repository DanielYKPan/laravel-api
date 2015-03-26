<?php


namespace Acme\Service\Validations\Form\User;

use Acme\Service\Validations\ValidatorInterface;
use Acme\Repo\User\UserRepositoryInterface;

class UserRegistrationForm {

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
    public function registerUser(array $registrationInform)
    {
        $this->validator->with($registrationInform)->validates();
        return $this->user->registerUser($registrationInform);
    }
} 
<?php


namespace Acme\Service\Validations\Form\User;

use Acme\Service\Validations\AbstractLaravelValidator;

class UserRegistrationFormValidator extends AbstractLaravelValidator {
    /**
     * Validation rules
     *
     * @var Array
     */
    protected $rules = [
        'email' => 'required|email',
        'password' => 'required',
        'first_name' => 'required',
        'last_name' => 'required',
        'user_role' => 'required'
    ];

    /**
     *  Return validation rules
     *
     * @return array
     */
    public function getRules()
    {
        $rules = [
            'email' => 'required|email',
            'password' => 'required',
            'first_name' => 'required',
            'last_name' => 'required',
            'user_role' => 'required'
        ];

        return $rules;
    }
} 
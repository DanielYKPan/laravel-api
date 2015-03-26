<?php


namespace Acme\Service\Validations\Form\User;

use Acme\Service\Validations\AbstractLaravelValidator;

class UserLoginFormValidator extends AbstractLaravelValidator {

    /**
     * Validation rules
     *
     * @var Array
     */
    protected $rules = [
        'email' => 'required|email',
        'password' => 'required'
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
            'password' => 'required'
        ];

        return $rules;
    }
} 
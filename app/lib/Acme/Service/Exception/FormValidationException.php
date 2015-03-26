<?php


namespace Acme\Service\Exception;

use Illuminate\Validation\Validator;


class FormValidationException extends \Exception{

    protected $validator;

    public function __construct(Validator $validator)
    {
        $this->validator = $validator;
    }

    public function getValidator()
    {
        return $this->validator;
    }

} 